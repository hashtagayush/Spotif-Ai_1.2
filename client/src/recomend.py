# import os
# import numpy as np
# import pandas as pd

# import seaborn as sns
# import plotly.express as px 
# import matplotlib.pyplot as plt
# # %matplotlib inline

# from sklearn.cluster import KMeans
# from sklearn.preprocessing import StandardScaler
# from sklearn.pipeline import Pipeline
# from sklearn.manifold import TSNE
# from sklearn.decomposition import PCA
# from sklearn.metrics import euclidean_distances
# from scipy.spatial.distance import cdist

# import warnings
# warnings.filterwarnings("ignore")

# data = pd.read_csv("../input/spotify-dataset/data/data.csv")
# genre_data = pd.read_csv('../input/spotify-dataset/data/data_by_genres.csv')
# year_data = pd.read_csv('../input/spotify-dataset/data/data_by_year.csv')

# from sklearn.cluster import KMeans
# from sklearn.preprocessing import StandardScaler
# from sklearn.pipeline import Pipeline

# cluster_pipeline = Pipeline([('scaler', StandardScaler()), ('kmeans', KMeans(n_clusters=10, n_jobs=-1))])
# X = genre_data.select_dtypes(np.number)
# cluster_pipeline.fit(X)
# genre_data['cluster'] = cluster_pipeline.predict(X)



# song_cluster_pipeline = Pipeline([('scaler', StandardScaler()), 
#                                   ('kmeans', KMeans(n_clusters=20, 
#                                    verbose=False, n_jobs=4))
#                                  ], verbose=False)

# X = data.select_dtypes(np.number)
# number_cols = list(X.columns)
# song_cluster_pipeline.fit(X)
# song_cluster_labels = song_cluster_pipeline.predict(X)
# data['cluster_label'] = song_cluster_labels