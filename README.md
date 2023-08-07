# SMS Expense Tracker - React Native with Expo

SMS Expense Tracker is a React Native application developed with Expo, designed to read and parse SMS messages, enabling you to track expenses based on categories and analyze transactions between bank accounts and individuals. This tool aims to simplify expense tracking and provide insights into your financial activities.

## Features

- **SMS Parsing**: The application reads SMS messages from your mobile device and extracts transaction-related information such as date, amount, sender/receiver details, and transaction type.

- **Expense Categorization**: Transactions are categorized into user-defined expense categories. You can customize categories to match your spending habits and financial goals.

- **Bank Account Transactions**: The application identifies transactions between different bank accounts and allows you to track interbank transfers easily.

- **Per-Bank and Per-Person Tracking**: Transactions between different banks and individuals are accurately recorded, helping you gain insights into your financial relationships and patterns.

- **Data Visualization**: Generate visual reports and charts based on your expense categories, transaction types, and financial trends over time.

## Backend (Python)

The backend of this application is implemented in Python. It handles SMS parsing, expense categorization, and data storage. You can find the backend code and more details in the [`backend`](backend/) directory.

## How to Use

### Installation

1. Clone this repository to your local machine.

   ```bash
   git clone https://github.com/zax4r0/expense-tracker.git
   ```

2. Navigate to the project directory.

```bash
cd sms-expense-tracker
```

3. Install the required dependencies.

```bash
yarn  install
```

4. Run

```bash
yarn run android
```

Use the Expo Go app on your mobile device to scan the QR code displayed in the terminal.

The application will launch on your device. Grant necessary permissions for reading SMS messages when prompted.

The application will scan your SMS messages, parse the relevant information, and categorize transactions based on your configuration.

## Contribution

Contributions to this project are welcome! If you encounter any issues or have ideas for improvements, please open an issue or submit a pull request.

## Versioning

This project follows [Semantic Versioning](https://semver.org/) but as the project is still pre-1.0. The code and the public exposed API should not be considered to be fixed and stable. Things can change at any time!

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)

## Disclaimer
This tool involves reading and processing SMS messages, which may involve privacy and security concerns. Use this tool responsibly and ensure that you comply with applicable laws and regulations regarding data privacy and SMS usage. The developers of this tool are not responsible for any misuse or unauthorized access to personal information.
