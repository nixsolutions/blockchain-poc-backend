curl -X POST -d "organisation=parents&mspId=ParentsMSP" http://api.blockchain.js.nixdev.co:3000/users/admin-enroll
curl -X POST -d "organisation=hospital&mspId=HospitalMSP" http://api.blockchain.js.nixdev.co:3000/users/admin-enroll
curl -X POST -d "organisation=kindergarten&mspId=KindergartenMSP" http://api.blockchain.js.nixdev.co:3000/users/admin-enroll

curl -X POST -d "enrollment_id=user-parents-1&first_name=Ann&last_name=Robson&role=Parents&organisation=parents&mspId=ParentsMSP" http://api.blockchain.js.nixdev.co:3000/users
curl -X POST -d "enrollment_id=user-hospital-1&first_name=Alex&last_name=Sikorsky&role=Hospital&organisation=hospital&mspId=HospitalMSP" http://api.blockchain.js.nixdev.co:3000/users
curl -X POST -d "enrollment_id=user-kindergarten-1&first_name=David&last_name=Connor&role=Kindergarten&organisation=kindergarten&mspId=KindergartenMSP" http://api.blockchain.js.nixdev.co:3000/users
