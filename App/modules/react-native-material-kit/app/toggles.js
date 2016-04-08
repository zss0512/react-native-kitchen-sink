/**
 * Created by ywu on 15/7/24.
 */

const React = require('react-native');
const MK = require('react-native-material-kit');
const appStyles = require('./styles');

const {
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
} = React;

const {
  MKIconToggle,
  MKSwitch,
  MKRadioButton,
  MKColor,
  getTheme,
  setTheme,
} = MK;

// customize the material design theme
// setTheme({
//   primaryColor: MKColor.Teal,
//   accentColor: MKColor.Purple,
// });

// Object.assign(getTheme().toggleTheme, {
//   onColor: 'rgba(76,175,80,.4)',
//   thumbOnColor: 'rgb(76,175,80)',
//   rippleColor: 'rgba(139,195,74,.2)',
// });

const styles = Object.assign(appStyles, StyleSheet.create({
  toggleText: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#616161',
  },
  toggleOnText: {
    color: getTheme().primaryColor,
  },
  switch: {
    marginTop: 2,
    // marginBottom: 5,
  },
  appleSwitch: {
    marginTop: 7,
    marginBottom: 7,
  },
}));

const CheckedIconToggle = MKIconToggle.toggle()
  .withChecked(true)
  .withOnCheckedChange(this._onChecked)
  .withOnPress(this._onToggleClicked)
  .build();

class Toggles extends Component {
  constructor() {
    super();
    this.radioGroup = new MKRadioButton.Group();
  }

  _onChecked(event) {
    console.log(`icon toggle is checked? ${event.checked}`);
  }

  _onToggleClicked() {
    console.log('you clicked a toggle');
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}
                  contentContainerStyle={styles.container}>
        <View style={styles.row}>
          <View style={styles.col}>
            <CheckedIconToggle>
              <Text state_checked={true}
                    style={[styles.toggleText, styles.toggleOnText]}>T</Text>
              <Text style={styles.toggleText}>T</Text>
            </CheckedIconToggle>
            <Text style={styles.legendLabel}>Icon on</Text>
          </View>
          <View style={styles.col}>
            <MKIconToggle>
              <Text state_checked={true}
                    style={[styles.toggleText, styles.toggleOnText]}>B</Text>
              <Text style={styles.toggleText}>B</Text>
            </MKIconToggle>
            <Text style={styles.legendLabel}>Icon off</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <MKSwitch checked={true}
                        style={styles.switch}
            />
            <Text style={styles.legendLabel}>Switch on</Text>
          </View>
          <View style={styles.col}>
            <MKSwitch style={styles.appleSwitch}
                        trackSize={30}
                        trackLength={52}
                        onColor="rgba(255,152,0,.3)"
                        thumbOnColor={MKColor.Orange}
                        rippleColor="rgba(255,152,0,.2)"
                        onPress={() => console.log('orange switch pressed')}
                        onCheckedChange={(e) => console.log('orange switch checked', e)}
              />
            <Text style={styles.legendLabel}>Switch off</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <MKRadioButton
              checked={true}
              group={this.radioGroup}/>
            <Text style={styles.legendLabel}>First</Text>
          </View>
          <View style={styles.col}>
            <MKRadioButton group={this.radioGroup}/>
            <Text style={styles.legendLabel}>Second</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

module.exports = Toggles;
