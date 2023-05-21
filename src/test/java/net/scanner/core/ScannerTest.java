package net.scanner.core;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotInteractableException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

public class ScannerTest {
    
    @Test
    void testTargetLogin() {
        String username = "abeidas";
        String password = "Ahmad-beidas5";
        String baseUrl = "https://tnbonline.ps/Retail/servletcontroller";
        System.out.println("Logging in....");
        // System.setProperty("webdriver.gecko.driver","C:\\Users\\ahmad.beidas\\Downloads\\geckodriver.exe");
        // System.setProperty("webdriver.http.factory", "jdk-http-client");
        FirefoxOptions options = new FirefoxOptions();
        // options.setHeadless(true);
        WebDriver driver = new FirefoxDriver(options);
        driver.get(baseUrl);
        try{Thread.sleep(2000);}catch(InterruptedException e){System.out.println(e);}
        List<WebElement> textInputs = driver.findElements(By.xpath("//input[@type='text']"));
        List<WebElement> passwordInputs = driver.findElements(By.xpath("//input[@type='password']"));
        List<WebElement> buttons = driver.findElements(By.xpath("//button[contains(text(), 'تسجيل الدخول')]"));
        for (WebElement webElement : textInputs) {
            try {
                webElement.sendKeys(username);
            } catch (ElementNotInteractableException e) {

            } catch (StaleElementReferenceException e) {
                
            }
        }
        for (WebElement webElement : passwordInputs) {
            try {
                webElement.sendKeys(password);
            } catch (ElementNotInteractableException e) {

            } catch (StaleElementReferenceException e) {
                
            }
        }
        for (WebElement webElement : buttons) {
            webElement.click();
        }
        System.out.println(textInputs.size());
        System.out.println(passwordInputs.size());
        
    }
}
