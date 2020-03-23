HOST_2=ec2-107-22-75-46.compute-1.amazonaws.com
HOST_3=ec2-3-91-238-161.compute-1.amazonaws.com
HOST_4=ec2-107-22-12-137.compute-1.amazonaws.com


if [[ $1 == 'parents' ]]
  then
    echo $1
    curl -X POST -d "organisation=parents&mspId=ParentsMSP" http://${HOST_2}:3006/users/admin-enroll
    curl -X POST -d "enrollment_id=user-parents-1&first_name=Ann&last_name=Robson&role=Parents&organisation=parents&mspId=ParentsMSP" http://${HOST_2}:3006/users
fi

if [[ $1 == 'hospital' ]]
  then
    echo $1
    curl -X POST -d "organisation=hospital&mspId=HospitalMSP" http://${HOST_3}:3006/users/admin-enroll
    curl -X POST -d "enrollment_id=user-hospital-1&first_name=Alex&last_name=Sikorsky&role=Hospital&organisation=hospital&mspId=HospitalMSP" http://${HOST_3}:3006/users
fi

if [[ $1 == 'kindergarten' ]]
  then
    echo $1
    curl -X POST -d "organisation=kindergarten&mspId=KindergartenMSP" http://${HOST_4}:3006/users/admin-enroll
    curl -X POST -d "enrollment_id=user-kindergarten-1&first_name=David&last_name=Connor&role=Kindergarten&organisation=kindergarten&mspId=KindergartenMSP" http://${HOST_4}:3006/users
fi
