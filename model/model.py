from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def load_data(file_path):
    return pd.read_excel(file_path)

def prepare_data(df):
    X = df.drop(columns=['STRESS_LEVEL', 'ANXIETY_LEVEL', 'DEPRESSION_LEVEL'])
    Y = df[['STRESS_LEVEL', 'ANXIETY_LEVEL', 'DEPRESSION_LEVEL']]
    return X, Y

def train_model(X_train, y_train):
    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)
    return model

@app.route('/train', methods=['POST'])
def train():
    file = request.files['file']
    data = pd.read_excel(file)
    X, Y = prepare_data(data)
    
    accuracies = {}
    for target in ['STRESS_LEVEL', 'ANXIETY_LEVEL', 'DEPRESSION_LEVEL']:
        X_train, X_test, y_train, y_test = train_test_split(X, Y[target], test_size=0.2, random_state=42)
        model = train_model(X_train, y_train)
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        accuracies[target] = accuracy
        joblib.dump(model, f"{target}_model.pkl")  # Save each model
    
    return jsonify({'accuracies': accuracies})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json['answers']
        
        # Ensure these column names match those used during training
        column_names = ['D1', 'D2', 'D3', 'D4', 'D5','D6','D7','D8','D9','D10','D11','D12','D13','D14','D15','D16','D17','D18','D19','D20','D21']  # Update accordingly
        input_df = pd.DataFrame([data], columns=column_names)
        
        predictions = {}
        for target in ['STRESS_LEVEL', 'ANXIETY_LEVEL', 'DEPRESSION_LEVEL']:
            model = joblib.load(f"{target}_model.pkl")
            predictions[target] = model.predict(input_df).tolist()
        print(predictions)
        return jsonify({'predictions': predictions})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
