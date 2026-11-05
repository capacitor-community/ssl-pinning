// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "IonicEnterpriseSslPinning",
    platforms: [.iOS(.v16)],
    products: [
        .library(
            name: "IonicEnterpriseSslPinning",
            targets: ["SSLPinningPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor.git", from: "9.0.0-beta.0")
    ],
    targets: [
        .target(
            name: "SSLPinningPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor")
            ],
            path: "ios/Sources/SSLPinningPlugin"),
        .testTarget(
            name: "SSLPinningPluginTests",
            dependencies: ["SSLPinningPlugin"],
            path: "ios/Tests/SSLPinningPluginTests")
    ]
)