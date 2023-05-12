---
title: SSL Pinning
sidebar_label: Overview
slug: /
---

### SSL Pinning Plugin

The SSL Pinning Plugin for Capacitor makes it easy to enable SSL certificate pinning for Android and iOS network requests.

## What is SSL Pinning?

SSL Pinning is a security technique that involves "pinning" a server's SSL certificate to an app. When a request is made to the server, the app compares the server's SSL certificate against the pinned certificate to ensure that it is valid and not tampered with. This helps protect against man-in-the-middle attacks, where an attacker intercepts and alters network traffic.

## Why use SSL Pinning?

SSL Pinning is particularly useful in scenarios where you need to ensure that your app is communicating securely with a specific server. For instance, if you are transmitting sensitive user data over the network or if your app depends on a specific API server.

By using SSL Pinning, you can verify that the SSL certificate presented by the server is indeed the correct one, which helps prevent attacks like certificate spoofing, DNS poisoning, and other similar threats.

## Potential Risks and Limitations

While SSL Pinning can help improve the security of your app, it is important to keep in mind the potential risks and limitations.

One potential risk is if certificates are not managed properly, they can be stolen or leaked, which can compromise the security of your app and its users.

Another potential limitation is that SSL Pinning can break your app if the server's SSL certificate changes. If the pinned certificate does not match the server's current certificate, your app will fail to connect to the server.
