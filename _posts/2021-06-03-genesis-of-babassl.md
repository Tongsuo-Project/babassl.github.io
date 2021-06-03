---
layout: post
title: "BabaSSL项目的诞生"
---
一直以来，在阿里系的产品和服务中对于密码学能力都存在着很多需求，例如在淘宝、天猫等电商业务中需要用TLS协议来对通信链路进行保护，阿里云上也存在着很多存储、网络相关的云产品和服务需要使用密码学技术来服务其客户，更不用说在蚂蚁集团中各类具备金融属性的业务了。因此，长期以来，在阿里集团和蚂蚁集团内部各自维护了多种不同的OpenSSL变种版本。

2019年，我们对整个阿里系内部的OpenSSL变种版本使用的情况进行了梳理，并将所有OpenSSL版本合并为一个变种，并重新命名为BabaSSL，即Brisk and Better Assured Cryptography and SSL/TLS toolkit。BabaSSL基于OpenSSL 1.1.1的基础上发展而来，并额外增加了新功能，例如新的IETF标准、国密相关的能力等等。BabaSSL再2020年10月时进行了首次的开源，并随后加入了阿里云OpenAnolis社区，默认集成到Alibaba Cloud Linux发行版中并支持阿里云全站国密的能力。

下面是BabaSSL的注册商标：

<span id="img1"><img src="/images/Babassl-logo-1.png" alt="logo" width="867" height="419"  /></span>
