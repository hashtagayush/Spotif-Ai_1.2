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
import json
import sys

json_argument = sys.argv[1]
original_dict = json.loads(json_argument)
# print(original_dict)
selected_features =["danceability","energy","key","loudness","mode","speechiness","acousticness","instrumentalness","liveness","valence","tempo","duration_ms",]

# Create a new dictionary with selected features
selected_dict = {feature: original_dict[feature] for feature in selected_features}

# print(selected_dict)

data = pd.read_csv('../dataset/data.csv')

features = ['valence', 'acousticness', 'danceability', 'duration_ms', 'energy','instrumentalness', 'key', 'liveness', 'loudness', 'mode',  'speechiness', 'tempo']
X = data[features]

input_data = pd.DataFrame([selected_dict])

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
# print(top_recommended_song_ids)
print(top_recommended_songs['id'].tolist())

