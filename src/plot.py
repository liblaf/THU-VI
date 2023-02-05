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


plt.figure()
plt.plot(df["date"], df["mean"], label="Mean")
plt.plot(df["date"], df["std"], label="STD")
plt.xlabel("Date")
plt.ylabel("NDVI")
plt.legend()
plt.tight_layout()
plt.savefig("report/assets/NDVI.png")
plt.close()


end = df["date"][len(df) - 1]
start = end - datetime.timedelta(days=365)
df = df[start <= df["date"]]
df.reset_index(inplace=True)
print("Duration :", df["date"][0], "->", end)
plt.figure()
plt.plot(df["date"], df["mean"], label="Mean")
plt.plot(df["date"], df["std"], label="STD")
plt.xlabel("Date")
plt.ylabel("NDVI")
plt.legend()
plt.tight_layout()
plt.savefig("report/assets/NDVI-year.png")
plt.close()
