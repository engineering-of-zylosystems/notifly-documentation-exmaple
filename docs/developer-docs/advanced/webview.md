---
sidebar_position: 6
---

# WebView

WebView 환경에서 Notifly SDK를 사용하는 방법을 안내합니다.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ios" label="iOS">

## iOS WebView 연동

### WKWebView 설정
```swift
import WebKit

class ViewController: UIViewController {
    @IBOutlet weak var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // WebView 설정
        setupWebView()
        
        // Notifly 초기화
        Notifly.initialize(projectId: "YOUR_PROJECT_ID")
    }
    
    func setupWebView() {
        // JavaScript와 네이티브 간 브리지 설정
        let contentController = webView.configuration.userContentController
        contentController.add(self, name: "notifly")
        
        // 웹페이지 로드
        if let url = URL(string: "https://your-website.com") {
            let request = URLRequest(url: url)
            webView.load(request)
        }
    }
}

// JavaScript 메시지 처리
extension ViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, 
                             didReceive message: WKScriptMessage) {
        if message.name == "notifly" {
            handleNotiflyMessage(message.body)
        }
    }
    
    func handleNotiflyMessage(_ body: Any) {
        guard let data = body as? [String: Any],
              let action = data["action"] as? String else { return }
        
        switch action {
        case "setUserId":
            if let userId = data["userId"] as? String {
                Notifly.setUserId(userId)
            }
        case "track":
            if let eventName = data["eventName"] as? String,
               let properties = data["properties"] as? [String: Any] {
                Notifly.track(eventName, properties: properties)
            }
        default:
            break
        }
    }
}
```

### JavaScript 브리지
```javascript
// WebView 내 JavaScript 코드
window.NotiflyBridge = {
    setUserId: function(userId) {
        window.webkit.messageHandlers.notifly.postMessage({
            action: 'setUserId',
            userId: userId
        });
    },
    
    track: function(eventName, properties) {
        window.webkit.messageHandlers.notifly.postMessage({
            action: 'track',
            eventName: eventName,
            properties: properties
        });
    }
};

// 사용 예시
NotiflyBridge.setUserId('user123');
NotiflyBridge.track('page_view', { page: '/home' });
```

</TabItem>
<TabItem value="android" label="Android">

## Android WebView 연동

### WebView 설정
```java
import android.webkit.WebView;
import android.webkit.JavascriptInterface;

public class MainActivity extends AppCompatActivity {
    private WebView webView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        webView = findViewById(R.id.webview);
        
        // WebView 설정
        setupWebView();
        
        // Notifly 초기화
        Notifly.initialize(this, "YOUR_PROJECT_ID");
    }
    
    private void setupWebView() {
        // JavaScript 활성화
        webView.getSettings().setJavaScriptEnabled(true);
        
        // JavaScript 인터페이스 추가
        webView.addJavascriptInterface(new NotiflyBridge(), "NotiflyBridge");
        
        // 웹페이지 로드
        webView.loadUrl("https://your-website.com");
    }
    
    // JavaScript 브리지 클래스
    public class NotiflyBridge {
        @JavascriptInterface
        public void setUserId(String userId) {
            runOnUiThread(() -> {
                Notifly.setUserId(userId);
            });
        }
        
        @JavascriptInterface
        public void track(String eventName, String propertiesJson) {
            runOnUiThread(() -> {
                try {
                    JSONObject properties = new JSONObject(propertiesJson);
                    Map<String, Object> propertiesMap = jsonToMap(properties);
                    Notifly.track(eventName, propertiesMap);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            });
        }
        
        private Map<String, Object> jsonToMap(JSONObject json) throws JSONException {
            Map<String, Object> map = new HashMap<>();
            Iterator<String> keys = json.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                map.put(key, json.get(key));
            }
            return map;
        }
    }
}
```

### JavaScript 브리지
```javascript
// WebView 내 JavaScript 코드
window.NotiflyBridge = {
    setUserId: function(userId) {
        if (window.NotiflyBridge && window.NotiflyBridge.setUserId) {
            window.NotiflyBridge.setUserId(userId);
        }
    },
    
    track: function(eventName, properties) {
        if (window.NotiflyBridge && window.NotiflyBridge.track) {
            window.NotiflyBridge.track(eventName, JSON.stringify(properties));
        }
    }
};

// 사용 예시
NotiflyBridge.setUserId('user123');
NotiflyBridge.track('page_view', { page: '/home' });
```

</TabItem>
<TabItem value="flutter" label="Flutter">

## Flutter WebView 연동

### WebView 설정
```dart
import 'package:webview_flutter/webview_flutter.dart';

class WebViewScreen extends StatefulWidget {
  @override
  _WebViewScreenState createState() => _WebViewScreenState();
}

class _WebViewScreenState extends State<WebViewScreen> {
  late WebViewController controller;
  
  @override
  void initState() {
    super.initState();
    
    // Notifly 초기화
    Notifly.initialize('YOUR_PROJECT_ID');
    
    // WebView 컨트롤러 설정
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..addJavaScriptChannel(
        'NotiflyBridge',
        onMessageReceived: (JavaScriptMessage message) {
          handleNotiflyMessage(message.message);
        },
      )
      ..loadRequest(Uri.parse('https://your-website.com'));
  }
  
  void handleNotiflyMessage(String message) {
    try {
      final data = jsonDecode(message) as Map<String, dynamic>;
      final action = data['action'] as String;
      
      switch (action) {
        case 'setUserId':
          final userId = data['userId'] as String;
          Notifly.setUserId(userId);
          break;
        case 'track':
          final eventName = data['eventName'] as String;
          final properties = data['properties'] as Map<String, dynamic>;
          Notifly.track(eventName, properties);
          break;
      }
    } catch (e) {
      print('Error handling Notifly message: $e');
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('WebView')),
      body: WebViewWidget(controller: controller),
    );
  }
}
```

### JavaScript 브리지
```javascript
// WebView 내 JavaScript 코드
window.NotiflyBridge = {
    setUserId: function(userId) {
        if (window.NotiflyBridge && window.NotiflyBridge.postMessage) {
            window.NotiflyBridge.postMessage(JSON.stringify({
                action: 'setUserId',
                userId: userId
            }));
        }
    },
    
    track: function(eventName, properties) {
        if (window.NotiflyBridge && window.NotiflyBridge.postMessage) {
            window.NotiflyBridge.postMessage(JSON.stringify({
                action: 'track',
                eventName: eventName,
                properties: properties
            }));
        }
    }
};

// 사용 예시
NotiflyBridge.setUserId('user123');
NotiflyBridge.track('page_view', { page: '/home' });
```

</TabItem>
<TabItem value="react-native" label="React Native">

## React Native WebView 연동

### WebView 설정
```javascript
import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';

const WebViewScreen = () => {
  useEffect(() => {
    // Notifly 초기화
    Notifly.initialize('YOUR_PROJECT_ID');
  }, []);
  
  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      const { action } = data;
      
      switch (action) {
        case 'setUserId':
          Notifly.setUserId(data.userId);
          break;
        case 'track':
          Notifly.track(data.eventName, data.properties);
          break;
        default:
          console.log('Unknown action:', action);
      }
    } catch (error) {
      console.error('Error handling WebView message:', error);
    }
  };
  
  const injectedJavaScript = `
    window.NotiflyBridge = {
      setUserId: function(userId) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          action: 'setUserId',
          userId: userId
        }));
      },
      
      track: function(eventName, properties) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          action: 'track',
          eventName: eventName,
          properties: properties
        }));
      }
    };
    
    true; // 필수: injected script가 성공적으로 실행되었음을 나타냄
  `;
  
  return (
    <WebView
      source={{ uri: 'https://your-website.com' }}
      javaScriptEnabled={true}
      onMessage={handleMessage}
      injectedJavaScript={injectedJavaScript}
    />
  );
};

export default WebViewScreen;
```

### JavaScript 브리지
```javascript
// WebView 내 JavaScript 코드
window.NotiflyBridge = {
    setUserId: function(userId) {
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
                action: 'setUserId',
                userId: userId
            }));
        }
    },
    
    track: function(eventName, properties) {
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
                action: 'track',
                eventName: eventName,
                properties: properties
            }));
        }
    }
};

// 사용 예시
NotiflyBridge.setUserId('user123');
NotiflyBridge.track('page_view', { page: '/home' });
```

### 고급 기능
```javascript
// 양방향 통신 예시
const WebViewScreen = () => {
  const webViewRef = useRef(null);
  
  // 네이티브에서 WebView로 메시지 전송
  const sendMessageToWebView = (message) => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify(message));
    }
  };
  
  // 푸시 알림 수신 시 WebView에 알림
  useEffect(() => {
    const unsubscribe = Notifly.onNotificationReceived((notification) => {
      sendMessageToWebView({
        type: 'notification_received',
        notification: notification
      });
    });
    
    return unsubscribe;
  }, []);
  
  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'https://your-website.com' }}
      onMessage={handleMessage}
      injectedJavaScript={injectedJavaScript}
    />
  );
};
```

</TabItem>
</Tabs>

## 공통 고려사항

### 보안
- JavaScript 브리지를 통해 전달되는 데이터 검증
- HTTPS 사용 권장
- 신뢰할 수 있는 도메인에서만 브리지 사용

### 성능
- 불필요한 메시지 전송 최소화
- 대용량 데이터 전송 시 청크 단위로 분할
- 메모리 누수 방지를 위한 적절한 리스너 해제

### 디버깅
- 브리지 통신 로그 활성화
- 웹 콘솔과 네이티브 로그 동시 확인
- 네트워크 상태 및 연결 상태 모니터링