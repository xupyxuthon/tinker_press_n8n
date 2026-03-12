
import requests
import json

# Local LM Studio Configuration
# Since you confirmed localhost works, let's use that.
LM_STUDIO_URL = "http://localhost:1234/v1/chat/completions"
LM_STUDIO_MODELS_URL = "http://localhost:1234/v1/models"

def test_lm_studio():
    print(f"\n--- Testing LM Studio at {LM_STUDIO_URL} ---")
    
    # 1. First, list models to see what is loaded
    try:
        print("Fetching model list...")
        models_resp = requests.get(LM_STUDIO_MODELS_URL, timeout=5)
        if models_resp.status_code == 200:
            models_data = models_resp.json()
            print("p✅ Models found:")
            for m in models_data.get('data', []):
                print(f"  - {m['id']}")
            
            # Pick the first one if possible, or default
            available_models = [m['id'] for m in models_data.get('data', [])]
            target_model = available_models[0] if available_models else "qwen1.5-7b-chat"
            print(f"Using model: {target_model}")
            
            # 2. Test chat completion
            payload = {
                "model": target_model,
                "messages": [{"role": "user", "content": "Hello!"}],
                "stream": False
            }
            chat_resp = requests.post(LM_STUDIO_URL, json=payload, timeout=10)
            if chat_resp.status_code == 200:
                print("✅ Chat Success!")
                print("Response:", chat_resp.json()['choices'][0]['message']['content'])
            else:
                print(f"❌ Chat Failed: {chat_resp.status_code}")
                print(chat_resp.text)
        else:
            print(f"❌ Listing Models Failed: {models_resp.status_code}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Refused on localhost:1234. Is LM Studio running and listening?")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_lm_studio()
