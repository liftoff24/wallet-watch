import joblib
import json
import sys
import os


base_dir = os.path.dirname(os.path.abspath(__file__))

# Path to the joblib file
model_path = os.path.join(base_dir, 'models', 'random_forest_classifier_binary.joblib')


# Load joblib
rf_classifier = joblib.load(model_path)

# predictions
def predict(input_data):
    
    # Check if dictionary
    if isinstance(input_data, dict):
        # Convert from string to numeric 
        outbound_txs = float(input_data.get('outbound_txs', 0))
        inbound_txs = float(input_data.get('inbound_txs', 0))
        total_txs = float(input_data.get('total_txs', 0))
        btc_transacted_total = float(input_data.get('btc_transacted_total', 0))
        btc_outflows = float(input_data.get('btc_outflows', 0))
        btc_inflows = float(input_data.get('btc_inflows', 0))
    else:
        print("Input data is not in the expected format.")

    
    # Create feature vector 
    user_input_features = [[outbound_txs, inbound_txs, total_txs, btc_transacted_total, btc_outflows, btc_inflows]]
    
    # Make  probability prediction
    prediction = rf_classifier.predict_proba(user_input_features)
        
    formatted_prediction = [round(x, 10) for x in prediction[:, 1]]  # Round each number to 10 decimal places
    return json.dumps(formatted_prediction)
if __name__ == "__main__":
    # Read input data
    input_data_json = sys.argv[1]
    input_data = json.loads(input_data_json)
    # Make prediction
    prediction = predict(input_data)

    # Print the prediction on console for viewing
    print(prediction)
    
