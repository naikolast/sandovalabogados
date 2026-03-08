import requests
import sys
from datetime import datetime

class SandovalAbogadosAPITester:
    def __init__(self, base_url="https://legal-firm-preview.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        default_headers = {'Content-Type': 'application/json'}
        if headers:
            default_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=default_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=default_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=default_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=default_headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_json = response.json()
                    print(f"   Response: {response_json}")
                    return True, response_json
                except:
                    print(f"   Response: {response.text}")
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'error': response.text
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'error': str(e)
            })
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "api/", 200)

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test POST status
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        success, response = self.run_test(
            "Create Status Check", 
            "POST", 
            "api/status", 
            200, 
            data=test_data
        )
        
        if success:
            # Test GET status
            success, response = self.run_test(
                "Get Status Checks", 
                "GET", 
                "api/status", 
                200
            )
            return success
        return False

    def test_contact_form(self):
        """Test contact form submission"""
        test_data = {
            "nombre": "Test Usuario",
            "email": "test@example.com",
            "telefono": "+56912345678",
            "tipo_caso": "Derecho de Familia",
            "mensaje": "Esta es una consulta de prueba para verificar el funcionamiento del formulario de contacto."
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=test_data
        )

    def test_invalid_contact_form(self):
        """Test contact form with invalid data"""
        # Test missing required fields
        invalid_data = {
            "nombre": "Test Usuario",
            "email": "invalid-email",  # Invalid email format
            "telefono": "+56912345678",
        }
        
        return self.run_test(
            "Contact Form Invalid Data",
            "POST",
            "api/contact",
            422,  # Unprocessable Entity for validation errors
            data=invalid_data
        )

def main():
    print("🚀 Starting Sandoval Abogados API Tests...")
    print("=" * 50)
    
    tester = SandovalAbogadosAPITester()
    
    # Test API root
    tester.test_api_root()
    
    # Test status endpoints
    tester.test_status_endpoints()
    
    # Test contact form - valid submission
    tester.test_contact_form()
    
    # Test contact form - invalid data
    tester.test_invalid_contact_form()
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results:")
    print(f"   Tests run: {tester.tests_run}")
    print(f"   Tests passed: {tester.tests_passed}")
    print(f"   Tests failed: {tester.tests_run - tester.tests_passed}")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for test in tester.failed_tests:
            error_msg = test.get('error', f"Expected {test.get('expected')}, got {test.get('actual')}")
            print(f"   - {test['name']}: {error_msg}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n📈 Success Rate: {success_rate:.1f}%")
    
    if success_rate >= 75:
        print("✅ Backend API tests mostly passing")
        return 0
    else:
        print("❌ Backend API has significant issues")
        return 1

if __name__ == "__main__":
    sys.exit(main())