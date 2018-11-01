package com.leaf.brain;



import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class HomeController {
	@GetMapping("/")
    public String getIndex() {
        return "index";
    }
	
	@GetMapping("/doc")
    public String getDocumentation() {     
        return "documentation";
    }
	
	@GetMapping("/aboutus")
    public String getAbout() {     
        return "aboutus";
    }
	
	
}
