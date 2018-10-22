package com.leaf.brain;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RestController;
import com.leaf.brain.ai.LeafBrainSingleton;

@RestController
@RequestMapping("/api")
public class RestServiceController {
	@PostMapping(value="/ai")
	public Map<Object, Object> checkIfLeaf(@RequestParam("file") MultipartFile file)
	{
		
		String mimeType = file.getContentType();
	    String type = mimeType.split("/")[0];
	    if (!type.equalsIgnoreCase("image")) {
	    	Map<Object,Object> map = new HashMap<>();
	    	map.put("status",false);
			map.put("message", "uploaded file is not image.");
			return map;
	    }
	    
		LeafBrainSingleton ai=LeafBrainSingleton.getInstance();
		try {
			Map<Object,Object> retVal=ai.verifyLeafWithAi(file.getBytes());
			retVal.put("status", true);
			retVal.put("message", "success");
			return retVal;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			Map<Object,Object> map = new HashMap<>();
			map.put("status", false);
			map.put("message", "Exception at server");
			return map;
		}
		
	}

}
