#!/bin/bash
for i in {42815..42819}
do
    rm -f /root/blackapitwo/main${i}
done

for i in {42815..42819}
do
    
    sed -i "s/42815/${i}/g" /root/blackapitwo/main.go
    go build -o main${i} main.go
    sed -i "s/${i}/42815/g" /root/blackapitwo/main.go

done

ssh root@172.28.162.55 "supervisorctl stop all"
ssh root@172.28.162.83 "supervisorctl stop all"
ssh root@172.28.162.85 "supervisorctl stop all"

for i in {42815..42819}
do

    scp /root/blackapitwo/main${i} root@172.28.162.55:/root/blackapitwo/main${i}
    scp /root/blackapitwo/main${i} root@172.28.162.83:/root/blackapitwo/main${i}
    scp /root/blackapitwo/main${i} root@172.28.162.85:/root/blackapitwo/main${i}

done

ssh root@172.28.162.55 "supervisorctl start all"
ssh root@172.28.162.83 "supervisorctl start all"
ssh root@172.28.162.85 "supervisorctl start all"


# for i in {42815..42819}
# do
#     ssh root@172.28.170.144 ""
#     # scp /root/blackapitwo/main${i} root@172.28.162.55:/root/blackapitwo/main${i}
#     # scp /root/blackapitwo/main${i} root@172.28.162.83:/root/blackapitwo/main${i}
#     # scp /root/blackapitwo/main${i} root@172.28.162.85:/root/blackapitwo/main${i}

# done

