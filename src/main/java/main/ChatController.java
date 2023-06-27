package main;

import main.model.User;
import main.model.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;

import java.util.HashMap;
import java.util.List;

@RestController


public class ChatController {
    private UserRepository userRepository;

    public ChatController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //TODO: Check session. If found user -> true else false
    //init проверяет авторизацию
    @GetMapping("/init")
    public HashMap<String, Boolean> init() {
        HashMap<String, Boolean> response = new HashMap<>();
        response.put("result", false);
        return response;
    }
    //auth - создание  пользователя и сессии -session Id
    //сохранить пользователя в базу данных(создать объект User, создать репозиторий)
    @PostMapping("/auth")
    public HashMap<String, Boolean> auth(String name){
        HashMap<String, Boolean> response = new HashMap<>();
        String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();
        User user = new User();
        user.setName(name);
        user.setSession(sessionId);

        userRepository.save(user);

        response.put("result", true);
        return response;
    }

    @PostMapping("/message")
    public Boolean sendMessage(@RequestParam String message) {
        return true;
    }
    //перечень сообщений
    @GetMapping("/message")
    public List<String> getMessagesList(){
        return null;
    }

    @GetMapping("/user")
    public HashMap<Integer, String> getUserList() {
        return null;
    }
}







