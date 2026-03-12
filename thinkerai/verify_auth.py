
import requests
import json
import time

BASE_URL = "http://localhost:3000"
AUTH_REGISTER = f"{BASE_URL}/api/auth/register"
AUTH_LOGIN = f"{BASE_URL}/api/auth/login"
CHAT_HISTORY = f"{BASE_URL}/api/chat/history"
CHAT_SEND = f"{BASE_URL}/api/chat"

USERNAME = f"testuser_{int(time.time())}"
PASSWORD = "password123"
CHARACTER_ID = "fuxi"

def test_auth_and_chat():
    print(f"--- Starting End-to-End Test for User: {USERNAME} ---")
    
    # 1. Register
    print("\n[1] Registering...")
    try:
        reg_res = requests.post(AUTH_REGISTER, json={"username": USERNAME, "password": PASSWORD})
        if reg_res.status_code == 200:
            user_data = reg_res.json()['user']
            user_id = user_data['id']
            print(f"✅ Registration Success! User ID: {user_id}")
        else:
            print(f"❌ Registration Failed: {reg_res.text}")
            return
    except Exception as e:
        print(f"❌ Registration Error: {e}")
        return

    # 2. Login (Optional, just to verify endpoint)
    print("\n[2] Logging in...")
    login_res = requests.post(AUTH_LOGIN, json={"username": USERNAME, "password": PASSWORD})
    if login_res.status_code == 200:
        print("✅ Login Verification Success!")
    else:
        print(f"❌ Login Failed: {login_res.text}")

    # 3. Check Empty History
    print("\n[3] Checking Initial History (Should be empty)...")
    hist_res = requests.get(f"{CHAT_HISTORY}?userId={user_id}&characterId={CHARACTER_ID}")
    if hist_res.status_code == 200:
        msgs = hist_res.json()['messages']
        print(f"✅ History Fetch Success. Count: {len(msgs)}")
    else:
        print(f"❌ History Fetch Failed: {hist_res.text}")

    # 4. Send Chat Message (Simulate persist)
    print("\n[4] Sending Chat Message...")
    chat_payload = {
        "messages": [{"role": "user", "content": "Hello Persistence!"}],
        "userId": user_id,
        "characterId": CHARACTER_ID,
        "system": "You are a helpful assistant."
    }
    
    # Simple non-stream check or just fire and forget for persistence test
    # We just want to see if it saves. Next.js stream response might act up in python requests without stream=True handling
    try:
        chat_res = requests.post(CHAT_SEND, json=chat_payload, stream=True)
        if chat_res.status_code == 200:
            print("✅ Chat Request Initiated.")
            # Consume stream to ensure backend processing finishes (onFinish callback)
            for line in chat_res.iter_lines():
                pass 
            print("✅ Chat Stream Consumed.")
        else:
             print(f"❌ Chat Request Failed: {chat_res.status_code}")
    except Exception as e:
        print(f"❌ Chat Error: {e}")

    # Wait a bit for file write
    time.sleep(2)

    # 5. Verify Persistence
    print("\n[5] Verifying Persistence...")
    hist_res_2 = requests.get(f"{CHAT_HISTORY}?userId={user_id}&characterId={CHARACTER_ID}")
    if hist_res_2.status_code == 200:
        msgs = hist_res_2.json()['messages']
        print(f"Found {len(msgs)} messages.")
        if len(msgs) >= 2: # User + Assistant
            print("✅ Persistence Confirmed! Found User and Assistant messages.")
            print(f"User: {msgs[-2]['content']}")
            print(f"AI: {msgs[-1]['content']}")
        else:
            print("⚠️ Persistence Warning: Messages not found as expected.")
            print(msgs)
    else:
        print(f"❌ History Fetch Failed: {hist_res_2.text}")

if __name__ == "__main__":
    test_auth_and_chat()
