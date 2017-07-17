# Projekt struktúra

## Backend kód

Az alkalmazás maga tartalmaz egy **_Spring Boot_**-os backend alkalmazást, amit **_HTML/CSS/JavaScript_** kódot szolgál ki a felhasználó felé.

Az alkalmazás az ```src/main/java/com/foldik/Application.java```-ban indul el.

```java
package com.foldik;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }
}
```

Erről az osztályról annyit érdemes elmondani, hogy van benne egy ```main(...)``` metódus ami miatt a **_JVM_** indulásakor ez az osztály lesz a belépési pont az alkalmazásunkban.
A ```main(...)``` metódusban a ```SpringApplication.run(Application.class)``` hatására a **_Spring Boot_** végig fogja scannelni a projektünket. Mivel az ```Application``` osztály tartalmaz egy ```@SpringBootApplication``` ezért az ehhez tartozó ```com.foldik``` package lesz a kiindulási pont a **_Spring Boot_** számára. Innentől minden számára érdekes annotációval ellátott dolgot bele fog rakni a kis zsákjába és elindítja az alkalmazásunkat.

**Nézzük mit talál eközben...**

* ```src/main/resources/application.properties```:

    Ez a fájl tartalmazza a **_Spring Boot_** számára fontos konfigurációkat. Ha a [megfelelő](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html#boot-features-external-config-application-property-files) helyre rakjuk, akkor a **_Spring Boot_** automatikusan meg fogja találni és minden benne található kulcs-érték párt felolvas. A property-k felolvasása során minden számára [érdekes](https://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html#common-application-properties) property-t (főleg azokat amik _spring...._-al kezdődnek) megjegyez és magát az alkalmazást is ez alapján indítja el, így magát a **_Spring_**-et is konfigurálhatjuk. A számára érdektelenek csak megjegyzi, hogyha mi használni akarnánk, akkor megkphassuk a property-khez tartozó értékeket. Az **_application.properties_** fájlban az alábbi értékeket találjuk:
    * ```spring.thymeleaf.prefix```:

    Ezzel mondhatjuk meg, hogy a frontend kódot melyik mappából szolgálja ki a spring. Nálunk ennek az értéke ```classpath:/app/```. Azért kell ez az érték, mert amikor a végleges **_jar_** elkészül, akkor a ```src/main/resources``` mappából minden bekerül a **_jar_** legkülső mappájába és ekkor az **_app_** mappát így tudjuk elérni.

    * ```spring.thymeleaf.mode```:

    Ez arra való, hogy beállítsuk milyen módban fusson a thymeleaf. Nálunk ez a ```LEGACYHTML5``` ami azért fontos, mert így nem kapunk hibát ha például néhány **_HTML_** tag esetében nincsen záró tag.
* ```src/main/java/com/foldik/config/MvcConfig.java```: Itt a **_Spring Boot_** megáll és azt mondja hohó ez egy ```@Configuration``` osztály, úgyhogy valószínűleg valami fontosat tartalmaz számomra.

``` java
package com.foldik.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/css/**").addResourceLocations("classpath:/app/css/");
        registry.addResourceHandler("/js/**").addResourceLocations("classpath:/app/js/");
    }
}
```

Mivel az ```MvcConfig``` a ```WebMvcConfigurerAdapter```-ból származik le ezért a **_Spring Boot_** rájön, hogy a frontent kiszolgálásához szükséges rész konfigurálásához lesz majd ez jó. Az osztályban lévő kód egyébként annyit csinál, hogy a **js** és **css** tartalmakat, amit a **html** tartalom miatt a böngésző kérni fog az ```app/css``` és ```app/js``` mappákból fogja kiszolgálni.

* ```src/main/java/com/foldik/controllers/HomeController.java```: Itt a **_Spring Boot_** azt látja, hogy ez egy ```@Controller``` annotációval ellátott osztály, aminek van egy metódusa, amin van egy ```@RequestMapping("/")``` annotáció. Ebből a Spring tudni fogja, hogy a http://localhost:8080/ url esetén ezt az osztályt kell meghívnia és a visszaadott oldalt kell kiszolgálni, ami esetünkben az **index.html** (mivel **html** módban vagyunk ezért a fájl kiterjesztése nem kell).
