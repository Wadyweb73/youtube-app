import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Video = {
  id: string;
  kind: string;
  snippet: Record<string, any>;
  statistics: Record<string, any>;
}

const Thumb = ({ video }: { video: Video }) => {
  const [CostPerView, CostPerLike, CostPerComment, CostPerFavorite]:number[] = [
    100, 20, 10, 40
  ];

  return (
    <View style={styles.statsContainer}>
      <View style={styles.thumbnailContainer}>
        <Image  source={{ uri: video.snippet.thumbnails.default.url }} style={styles.thumbnail} />
      </View>

      <View style={ styles.videoTitleContainer }>
        <Text style={styles.videoTitle}>{ video.snippet.localized.title } </Text>
      </View>

      <View style={ styles.videoTitleContainer }>
        <Text style={[styles.videoTitle, {
          color: '#000',
          fontWeight: 'bold'
        }]}>Data de Publicacao: </Text>
        <Text style={styles.publishDate}> { video.snippet.publishedAt.toString() } </Text>
      </View>

      <View style={styles.statsTableWrapper}>
        <View style={styles.statsTable}>
          <View style={styles.statsColumn}>
            <View>
              <Text style={{ fontWeight: 'bold' }}>-</Text>
            </View>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Custo</Text>
            </View>
          </View>

          <View style={styles.statsColumn}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>View</Text>
            </View>
            <View>
              <Text style={{ fontSize: 20 }}>{ CostPerView }</Text>
            </View>
          </View>

          <View style={styles.statsColumn}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Like</Text>
            </View>
            <View>
              <Text style={{ fontSize: 20 }}>{ CostPerLike }</Text>
            </View>
          </View>

          <View style={styles.statsColumn}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Comentario</Text>
            </View>
            <View>
              <Text style={{ fontSize: 20 }}>{ CostPerComment }</Text>
            </View>
          </View>

          <View style={styles.statsColumn}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Favorito</Text>
            </View>
            <View>
              <Text style={{ fontSize: 20 }}>{ CostPerFavorite }</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsCardsContainer}>
          <View style={styles.topStatsCards}>            
            <View style={[styles.statsCard, styles.favoriteCard]}>
              <Ionicons name='star-sharp' size={40} color={'#fff'}/>
              <Text style={{ 
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
                // color: 'yellow'
              }}>{ video.statistics.favoriteCount } </Text>
            </View>
            
            <View style={[styles.statsCard, styles.viewsCard]}>
              <Ionicons name='eye' size={40} color={'#fff'}/>
              <Text style={{ 
                fontWeight: 'bold',
                color: 'white',
                // color: 'red',
                fontSize: 20
              }}>{ video.statistics.viewCount }</Text>
            </View>
          </View>

          <View style={styles.bottomStatsCards}>
            <View style={[styles.statsCard, styles.commentCard]}>
              <Ionicons name='chatbubbles' size={40} color={'white'}/>
              <Text style={{ 
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white'
              }}>{ video.statistics.commentCount } </Text>
            </View>

            <View style={[styles.statsCard, styles.likeCard]}>
              <Ionicons name='thumbs-up-sharp' size={40} color={'#fff'}/>
              <Text style={{ 
                fontWeight: 'bold',
                // color: '#00ff00c4',
                color: 'white',
                fontSize: 20
              }}>{ video.statistics.likeCount } </Text>
            </View>
          </View>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultCardTitle}>Extimativa de Lucro</Text>
          <Text style={styles.resultCardValue}>
            ${
              ((video.statistics.viewCount     * CostPerView    +
                video.statistics.likeCount     * CostPerLike    +
                video.statistics.commentCount  * CostPerComment +
                video.statistics.favoriteCount * CostPerFavorite
              ) / 63).toFixed(2)
            } 
          </Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  statsTableWrapper: {
    padding: 10
  },
  statsContainer: {
    width: '100%',
    height: '100%',
  },
  thumbnailContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'red',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' 
  },
  videoTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 10
  },
  
  videoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6d6a6a'
  },
  publishDate: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6d6a6a'
  },
  statsTable: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#cdcdcd'
  },
  statsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  statsCardsContainer: {
    display: 'flex',
    gap: 10,
    marginTop: 20
  },
  topStatsCards: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around'
  },
  bottomStatsCards: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around'
  },
  statsCard: {
    width: 150,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: 25,
    flex: 1
  },
  viewsCard: {
    backgroundColor: '#a9a025ac'
  },
  likeCard: {
    backgroundColor: '#6d6a6a'
  },
  commentCard: {
    backgroundColor: '#13ca1380'
  },
  favoriteCard: {
    backgroundColor: '#ff0000a0'
  },
  resultCard: {
    backgroundColor: '#ff0000',
    width: 'auto',
    padding: 20,
    borderRadius: 30,
    marginTop: 10
  },
  resultCardTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  resultCardValue: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    marginTop: 20
  }
})

export default Thumb;
