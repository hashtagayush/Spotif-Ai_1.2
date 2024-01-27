import os
import numpy as np
import pandas as pd

import seaborn as sns
import plotly.express as px 
import matplotlib.pyplot as plt
# %matplotlib inline

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.manifold import TSNE
from sklearn.decomposition import PCA
from sklearn.metrics import euclidean_distances
from scipy.spatial.distance import cdist
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

import warnings
warnings.filterwarnings("ignore")





data = pd.read_csv('./data.csv')

features = ['valence', 'acousticness', 'danceability', 'duration_ms', 'energy',
 'instrumentalness', 'key', 'liveness', 'loudness', 'mode',  'speechiness', 'tempo']
X = data[features]

input_song_features = {
    "danceability": 0.794,
    "energy": 0.753,
    "key": 10,
    "loudness": -3.112,
    "mode": 1,
    "speechiness": 0.0609,
    "acousticness": 0.543,
    "instrumentalness": 0,
    "liveness": 0.12,
    "valence": 0.906,
    "tempo": 159.965,
    "duration_ms": 267029,
    "year":2000,

}

input_data = pd.DataFrame([input_song_features])

input_data = input_data[features]
song_cluster_pipeline = Pipeline([
    ('scaler', StandardScaler()), 
    ('kmeans', KMeans(n_clusters=20, verbose=False))
], verbose=False)

song_cluster_pipeline.fit(X)
song_cluster_labels = song_cluster_pipeline.predict(X)
data['cluster_label'] = song_cluster_labels
predicted_cluster_label = song_cluster_pipeline.predict(input_data)

recommended_songs = data[data['cluster_label'] == predicted_cluster_label[0]]
top_recommended_songs = recommended_songs.sort_values(by='popularity', ascending=False).head(10)
top_recommended_song_ids = top_recommended_songs['id']

# Display the top recommended song IDs
print(top_recommended_song_ids)