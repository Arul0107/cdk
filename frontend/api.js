export const predictCKD = async (features, modelType) => {
    const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features, model_type: modelType }),
    });
    return response.json();
};
