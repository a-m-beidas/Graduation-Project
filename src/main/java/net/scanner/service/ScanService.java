package net.scanner.service;

import net.scanner.model.Record;
import net.scanner.repository.RecordRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ScanService {

    @Autowired
    RecordRepository recordRepository;

    public String processPage(String url) throws IOException {

        if (recordRepository.findById(url).isPresent()) {
            return null;
        }
        recordRepository.save(new Record(url));
        //get useful information
        Document doc = Jsoup.connect(url).get();
        String str = doc.text();
        System.out.println(str);
//			if(doc.text().contains("mit")){
//				System.out.println(URL);
//			}
        //get all links and recursively call the processPage method
        Elements questions = doc.select("a[href]");
        for (Element link : questions) {
//				if(link.attr("href").contains("mit.edu"))
            if (!link.attr("href").contains("#"))
                processPage(link.attr("abs:href"));
        }
        return null;
    }
}
