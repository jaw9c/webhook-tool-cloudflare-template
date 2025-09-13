# Webhook Tool Cloudflare Worker Template

This repository provides a **Cloudflare Worker template** for creating custom webhook tools that integrate with [Wassist](https://wassist.app).

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Wassist/webhook-tool-cloudflare-template)

## 🎯 What This Template Does

This Cloudflare Worker example creates an interactive guessing game with the following features:

- **Museum Portrait Game**: Users attempt to guess the name of a portrait displayed in a museum
- **Airtable Integration**: Game data is stored and managed in Airtable
- **Secure Webhook Tools**: Two custom tools that your AI assistant can interact with

## 🛠️ Available Tools

### Start Game Tool
- Uses the phone number variable from the assistant to identify players
- Calls the Airtable API to fetch a random, inactive portrait
- Returns a unique game ID and portrait information to begin the game

### End Game Tool  
- Accepts the game ID and the user's guess count
- Validates the guess against the correct answer
- Returns whether the guess was correct or not

## 🔒 Security

The worker includes API secret validation to ensure webhook requests are authentic and coming from authorized sources.

## 🚀 Getting Started

1. Clone this template
2. Configure your Airtable API credentials
3. Set up your webhook security secret
4. Deploy to Cloudflare Workers
5. Integrate the webhook URLs with your AI assistant

Perfect for developers looking to build interactive, data-driven experiences with AI assistants using Cloudflare and Wassist.
