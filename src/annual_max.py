import datetime

import matplotlib.pyplot as plt
import pandas as pd

plt.rc("figure", dpi=300)


df: pd.DataFrame = pd.read_csv("data/ee-chart.csv")
df.rename(
    columns={"system:time_start": "date", "NDVI_mean": "mean", "NDVI_stdDev": "std"},
    inplace=True,
)
df["date"] = pd.to_datetime(df["date"])


df["year"] = df["date"].apply(lambda x: x.year)
groups = df.groupby(by="year")
for year, data in groups:
    idx = data["mean"].idxmax()
    print(idx, data["date"][idx], data["mean"][idx])
