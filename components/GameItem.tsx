import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import colorSwatch from "../Colors";
import { QuestGameListItem } from "../interfaces/QuestGameListItem";
import Icon from "react-native-vector-icons/SimpleLineIcons";

interface GameItemProps {
    questGameListItem: QuestGameListItem;
    reorder?: () => void;
}

const GameItem: React.FC<GameItemProps> = ({ questGameListItem, reorder }) => {
    const earliestReleaseDate = questGameListItem.release_dates
        ?.map((date) => date.date)
        .sort((a, b) => a - b)[0];

    const formattedReleaseDate = earliestReleaseDate
        ? new Date(earliestReleaseDate * 1000).toLocaleDateString()
        : "No release date available";

    return (
        <View style={styles.gameContainer}>
            {questGameListItem.priority && (
                <Pressable onTouchStart={reorder} style={styles.dragHandle}>
                    <Icon
                        name="menu"
                        size={24}
                        color={colorSwatch.primary.dark}
                    />
                    <Text style={{ color: colorSwatch.primary.dark }}>
                        {questGameListItem.priority}
                    </Text>
                </Pressable>
            )}

            {questGameListItem.cover && questGameListItem.cover.url ? (
                <Image
                    source={{
                        uri: `https:${questGameListItem.cover.url}`,
                    }}
                    style={styles.cover}
                />
            ) : (
                <View style={styles.cover} />
            )}

            <View style={styles.detailsContainer}>
                <View>
                    <Text style={styles.title}>{questGameListItem.name}</Text>
                    {questGameListItem.gameStatus === "completed" &&
                        questGameListItem.rating !== undefined && (
                            <Text style={styles.rating}>
                                {" "}
                                {"⭐".repeat(
                                    questGameListItem.personalRating ?? 0
                                )}
                                {"☆".repeat(
                                    10 - (questGameListItem.personalRating ?? 0)
                                )}{" "}
                                ({questGameListItem.personalRating ?? 0}/10)
                            </Text>
                        )}
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.textSecondary}>
                        Date Added: {questGameListItem.dateAdded}
                    </Text>
                    <Text style={styles.textSecondary}>
                        Genres:{" "}
                        {questGameListItem.genres
                            ?.map((genre) => genre.name)
                            .join(", ")}
                    </Text>
                    <Text style={styles.textSecondary}>
                        Release Date: {formattedReleaseDate}
                    </Text>
                    <Text style={styles.textSecondary}>
                        Platform: {questGameListItem.platform}
                    </Text>
                    {questGameListItem.notes && (
                        <View style={styles.quoteContainer}>
                            <Text style={styles.quote}>
                                {questGameListItem.notes}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    gameContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: colorSwatch.primary.dark,
        overflow: "hidden",
        flex: 1,
    },
    priority: {
        fontSize: 20,
        color: colorSwatch.accent.green,
        alignSelf: "center",
        marginHorizontal: 10,
    },
    dragHandle: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
        color: colorSwatch.accent.green,
        alignSelf: "flex-start",
    },
    rating: {
        fontSize: 10,
        marginBottom: 5,
        color: colorSwatch.accent.purple,
    },
    cover: {
        minWidth: 75,
        minHeight: 100,
        marginRight: 10,
        backgroundColor: colorSwatch.neutral.gray,
    },
    textSecondary: {
        fontSize: 12,
        color: colorSwatch.text.secondary,
    },
    detailsContainer: {
        flexDirection: "column",
        alignSelf: "flex-start",
        flex: 1,
    },
    quoteContainer: {
        marginTop: 5,
    },
    quote: {
        fontStyle: "italic",
        color: colorSwatch.secondary.light,
    },
    buttonInnerContainer: {
        backgroundColor: colorSwatch.background.dark,
        paddingVertical: 8,
        elevation: 4,
        flexDirection: "row",
    },
    pressed: {
        opacity: 0.75,
    },
});

export default GameItem;
