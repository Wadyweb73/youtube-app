import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Video = {
  id: string;
  kind: string;
  snippet: Record<string, any>;
  statistics: Record<string, any>;
};

const Thumb = ({ video }: { video: Video }) => {
  const [CostPerView, CostPerLike, CostPerComment, CostPerFavorite]: number[] =
    [100, 20, 10, 40];

  const grossProfit: number = Number(
    (
      (video.statistics.viewCount * CostPerView +
        video.statistics.likeCount * CostPerLike +
        video.statistics.commentCount * CostPerComment +
        video.statistics.favoriteCount * CostPerFavorite) /
      63
    ).toFixed(2),
  );

  const diffInDays = (start: Date, end: Date) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffMs = end.getTime() - start.getTime();

    return -Math.floor(diffMs / msPerDay);
  };

  const bonusCalculation = () => {
    let bonus: number = 0;
    const views = video.statistics.viewCount;
    const daysSincePublication = diffInDays(
      new Date(),
      new Date(video.snippet.publishedAt),
    );

    if (daysSincePublication < 10 && views > 1000) {
      bonus = grossProfit * 0.2;
    } else if (daysSincePublication < 30 && views > 1000) {
      bonus = grossProfit * 0.1;
    }

    return bonus;
  };

  return (
    <View style={styles.statsContainer}>
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: video.snippet.thumbnails.default.url }}
          style={styles.thumbnail}
        />
      </View>

      <View style={styles.videoTitleContainer}>
        <Text style={styles.videoTitle}>{video.snippet.localized.title} </Text>
      </View>

      <View style={styles.videoTitleContainer}>
        <Ionicons name="calendar" size={16} color={"#777"} />
        <Text style={styles.publishDate}>
          {" "}
          {(video.snippet.publishedAt.toString()).split("T")[0].split("-").reverse().join("-")}
          {" "}
        </Text>
      </View>

      <View style={styles.statsWrapper}>
        <View style={styles.statsTable}>
          {/* Header */}
          <View style={[styles.statsRow, styles.statsHeaderRow]}>
            <Text style={[styles.statsCell, styles.statsHeaderText]}></Text>
            <Text style={[styles.statsCell, styles.statsHeaderText]}>
              Custo
            </Text>
          </View>

          {/* Rows */}
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Views</Text>
            <Text style={styles.statsValue}>${CostPerView}</Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Likes</Text>
            <Text style={styles.statsValue}>${CostPerLike}</Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Comentários</Text>
            <Text style={styles.statsValue}>${CostPerComment}</Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Favoritos</Text>
            <Text style={styles.statsValue}>${CostPerFavorite}</Text>
          </View>
        </View>

        <View style={styles.statsCardsContainer}>
          <View style={styles.topStatsCards}>
            <View style={[styles.statsCard, styles.favoriteCard]}>
              <Ionicons name="star-sharp" size={40} color={"#fff"} />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "white",
                  // color: 'yellow'
                }}
              >
                {video.statistics.favoriteCount}{" "}
              </Text>
            </View>

            <View style={[styles.statsCard, styles.viewsCard]}>
              <Ionicons name="eye" size={40} color={"#fff"} />
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                  // color: 'red',
                  fontSize: 20,
                }}
              >
                {video.statistics.viewCount}
              </Text>
            </View>
          </View>

          <View style={styles.bottomStatsCards}>
            <View style={[styles.statsCard, styles.commentCard]}>
              <Ionicons name="chatbubbles" size={40} color={"white"} />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "white",
                }}
              >
                {video.statistics.commentCount}{" "}
              </Text>
            </View>

            <View style={[styles.statsCard, styles.likeCard]}>
              <Ionicons name="thumbs-up-sharp" size={40} color={"#fff"} />
              <Text
                style={{
                  fontWeight: "bold",
                  // color: '#00ff00c4',
                  color: "white",
                  fontSize: 20,
                }}
              >
                {video.statistics.likeCount}{" "}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultCardTitle}>Lucro Bruto</Text>
          <Text style={styles.resultCardValue}>
            $
            {(
              (video.statistics.viewCount * CostPerView +
                video.statistics.likeCount * CostPerLike +
                video.statistics.commentCount * CostPerComment +
                video.statistics.favoriteCount * CostPerFavorite) /
              63
            ).toFixed(2)}
          </Text>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultCardTitle}>
            Lucro Bruto + Bonus ({bonusCalculation().toFixed(2)})
          </Text>
          <Text style={styles.resultCardValue}>
            ${Number(grossProfit + bonusCalculation()).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  statsWrapper: {
    padding: 10,
  },

  statsContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f9f9f9",
  },

  thumbnailContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
  },

  thumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  videoTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
  },

  videoTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    flexShrink: 1,
  },

  publishDate: {
    fontSize: 14,
    color: "#777",
  },
  statsTable: {
    marginTop: 15,
    backgroundColor: "#f0e2e2",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  statsHeaderRow: {
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },

  statsCell: {
    flex: 1,
  },

  statsHeaderText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#999",
    textAlign: "right",
  },

  statsLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#444",
  },

  statsValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111",
  },

  statsCardsContainer: {
    gap: 10,
    marginTop: 20,
  },

  topStatsCards: {
    flexDirection: "row",
    gap: 10,
  },

  bottomStatsCards: {
    flexDirection: "row",
    gap: 10,
  },

  statsCard: {
    flex: 1,
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 25,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  viewsCard: {
    backgroundColor: "#f4b400",
  },

  likeCard: {
    backgroundColor: "#6c757d",
  },

  commentCard: {
    backgroundColor: "#2ecc71",
  },

  favoriteCard: {
    backgroundColor: "#e74c3c",
  },

  /* =========================
      RESULT CARD
     ========================= */

  resultCard: {
    backgroundColor: "#1e1e1e",
    padding: 25,
    borderRadius: 25,
    marginTop: 15,
  },

  resultCardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#bbb",
  },

  resultCardValue: {
    fontSize: 30,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Thumb;
