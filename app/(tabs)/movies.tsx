import { MovieGenreSection } from "@/components/MovieGenreSection";
import { useMoviesTabData } from "@/hooks/useMoviesTabData";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function MoviesTab() {
  const {
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    nowPlayingMovies,
    movieGenres,
    isLoading,
    isError,
  } = useMoviesTabData();

  if (isLoading) return <ActivityIndicator size="large" />;
  if (isError) return <Text>Error loading movies</Text>;

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Popular</Text>
          {popularMovies.map((m) => (
            <Text key={m.id}>{m.title}</Text>
          ))}

          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Top Rated</Text>
          {topRatedMovies.map((m) => (
            <Text key={m.id}>{m.title}</Text>
          ))}

          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Upcoming</Text>
          {upcomingMovies.map((m) => (
            <Text key={m.id}>{m.title}</Text>
          ))}

          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Now Playing</Text>
          {nowPlayingMovies.map((m) => (
            <Text key={m.id}>{m.title}</Text>
          ))}
        </View>
      }
      data={movieGenres}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieGenreSection genreId={item.id} genreName={item.name} />
      )}
    />
  );
}
