import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  SafeAreaView,
} from "react-native";
import { colors, CLEAR, ENTER, colorsToEmoji } from "./src/constants";
import Keyboard from "./src/components/Keyboard";
import * as Clipboard from "expo-clipboard";

const NUMBER_OF_TRIES = 6;

const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};

const getDayOfTheYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};

const dayOfTheYear = getDayOfTheYear();

const words = [
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
  "oromia",
  "ethiopia",
  "coop",
  "javascript",
  "python",
  "dxhub",
];

export default function App() {
  const word = words[dayOfTheYear];
  const letters = word.split("");

  const oldRrows = new Array(NUMBER_OF_TRIES).fill(
    new Array(letters.length).fill("")
  );
  const [rows, setRows] = useState(oldRrows);
  const [curRows, setCurRows] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState("playing");

  useEffect(() => {
    if (curRows > 0) {
      checkGameState();
    }
  }, [curRows]);

  const checkGameState = () => {
    if (checkIfWon() && gameState !== "won") {
      Alert.alert("Horaay", "You Won!", [
        { text: "Share", onPress: shareScore },
      ]);
      setGameState("won");
    } else if (checkIfLost() && gameState !== "lost") {
      Alert.alert("Meh", "Try again Tomorrow!");
      setGameState("lost");
    }
  };

  const shareScore = () => {
    const textShare = rows
      .map((row, i) =>
        row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join("")
      )
      .filter((row) => row)
      .join("\n");

    Clipboard.setStringAsync(textShare);

    Alert.alert("Copied Successfully", "Share your score on your social media");
  };

  const checkIfWon = () => {
    const row = rows[curRows - 1];
    return row.every((letter, i) => letter === letters[i]);
  };

  const checkIfLost = () => {
    return curRows === rows.length;
  };

  const onKeyPressed = (key) => {
    if (gameState !== "playing") {
      return;
    }
    const updatedRows = copyArray(rows);

    if (key === CLEAR) {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRows][prevCol] = "";
        setRows(updatedRows);
        setCurCol(curCol - 1);
      }
      return;
    }

    if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRows(curRows + 1);
        setCurCol(0);
      }
      return;
    }

    if (curCol < rows[0].length) {
      updatedRows[curRows][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  };

  const isCellActive = (row, col) => {
    return row === curRows && col === curCol;
  };

  const getCellBGColor = (row, col) => {
    const letter = rows[row][col];
    if (row >= curRows) {
      return colors.black;
    }
    if (letter === letters[col]) {
      return colors.primary;
    }
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };

  const getAllLettersWithColor = (color) => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === color)
    );
  };

  const greenCaps = getAllLettersWithColor(colors.primary);
  const yellowCaps = getAllLettersWithColor(colors.secondary);
  const greyCaps = getAllLettersWithColor(colors.darkgrey);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>WORDLE</Text>
      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((letter, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(i, j)
                      ? colors.lightgrey
                      : colors.darkgrey,
                    backgroundColor: getCellBGColor(i, j),
                  },
                ]}
              >
                <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Keyboard
        onKeyPressed={onKeyPressed}
        greenCaps={greenCaps}
        yellowCaps={yellowCaps}
        greyCaps={greyCaps}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    // marginTop: StatusBar.currentHeight
    // justifyContent: 'center',
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
  },
  map: {
    alignSelf: "stretch",
    marginVertical: 20,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    borderWidth: 3,
    borderColor: colors.darkgrey,
    flex: 1,
    maxWidth: 70,
    aspectRatio: 1,
    margin: 3,
    justifyContent: "center", //center its children(cell in this case) vertical direction
    alignItems: "center", //center its children(cell in this case) horizontal direction
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: "bold",
    fontSize: 28,
  },
});
