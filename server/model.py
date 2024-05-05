import joblib
import json
import sys
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

try:
    # Load joblib model
    rf_classifier = joblib.load('models/random_forest_classifier_binary.joblib')
    logging.info("Model loaded successfully.")
except Exception as e:
    logging.error(f"Failed to load model: {e}")
    sys.exit(1)  # Exit script with error code 1 if model cannot be loaded

def predict(input_data):
    try:
        if isinstance(input_data, dict):
            # Convert from string to numeric, ensuring all required fields are present
            try:
                outbound_txs = float(input_data['outbound_txs'])
                inbound_txs = float(input_data['inbound_txs'])
                total_txs = float(input_data['total_txs'])
                btc_transacted_total = float(input_data['btc_transacted_total'])
                btc_outflows = float(input_data['btc_outflows'])
                btc_inflows = float(input_data['btc_inflows'])
            except KeyError as e:
                logging.error(f"Missing data for prediction: {e}")
                return json.dumps({"error": f"Missing data: {e}"})
            except ValueError as e:
                logging.error(f"Invalid data type for prediction: {e}")
                return json.dumps({"error": f"Invalid data type: {e}"})

            # Create feature vector
            user_input_features = [[outbound_txs, inbound_txs, total_txs, btc_transacted_total, btc_outflows, btc_inflows]]
            
            # Make probability prediction
            prediction = rf_classifier.predict_proba(user_input_features)
            formatted_prediction = [round(x, 10) for x in prediction[:, 1]]  # Round each number to 10 decimal places
            return json.dumps(formatted_prediction)
        else:
            logging.error("Input data is not in the expected format (dict).")
            return json.dumps({"error": "Input data is not in the expected format."})
    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        return json.dumps({"error": str(e)})

if __name__ == "__main__":
    # Check command line arguments for input data
    if len(sys.argv) > 1:
        input_data_json = sys.argv[1]
        try:
            input_data = json.loads(input_data_json)
            prediction = predict(input_data)
            print(prediction)
        except json.JSONDecodeError as e:
            logging.error(f"Error decoding JSON: {e}")
    else:
        logging.error("No input data provided.")
