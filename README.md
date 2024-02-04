# KleverHub Integration Guide

## Introduction

This documentation offers a straightforward guide on utilizing the methods exposed by KleverHub when seamlessly injected into your browser. Ideal for integration with various chains supported by the Klever Extension, this guide is your go-to resource. If you're not dealing with multiple chains, you can stick to using `kleverWeb` for a simplified experience. Let's dive in!

## Getting Started

### Installation

Ensure that the Klever Extension is installed in your browser.

### Initialization

In your React application, initialize the `KleverHub` by calling the `initialize` method. This method takes an optional parameter, `chain`, representing the blockchain to connect to. If not provided, it defaults to the Klever Chain (`KLV`).

```javascript
async function connectWallet() {
  if (window && window.kleverHub) {
    try {
      await window.kleverHub.initialize(Chain.KLEVER);

      if (window.kleverHub.connected) {
        console.log("Connected to wallet");
      }
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
    }
  } else {
    console.error("No wallet provider found");
  }
}
```

### Switching Blockchain
You can switch between supported blockchains using the switchBlockchain method.

```javascript
async function switchBlockchain(chain: keyof typeof Chain) {
  await window.kleverHub.switchBlockchain(chain);
}
```

### Handling Account Changes
To react to changes in the connected account, use the `onAccountChanged` and `offAccountChanged` methods.

```javascript
useEffect(() => {
  if (window && window.kleverHub) {
    const handleAccountChanged = (account: HubAccount) => {
      setAccount(account);
    };

    window.kleverHub.onAccountChanged(handleAccountChanged);

    return () => {
      window.kleverHub.offAccountChanged(handleAccountChanged);
    };
  }
}, []);
```

### Handling Blockchain Changes
Similarly, you can handle changes in the selected blockchain using onBlockchainChanged and offBlockchainChanged.

```javascript
useEffect(() => {
  if (window && window.kleverHub) {
    const handleBlockchainChanged = (chain: Chain) =>
      setCurrentChain(chains[chain]);

    window.kleverHub.onBlockchainChanged(handleBlockchainChanged);

    return () => {
      window.kleverHub.offBlockchainChanged(handleBlockchainChanged);
    };
  }
}, []);
```
