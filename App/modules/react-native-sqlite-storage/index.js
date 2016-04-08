'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    AsyncStorage,
} = React;


var Button = require('@remobile/react-native-simple-button');
var Sqlite = require('@remobile/react-native-sqlite');
var CacheImage = require('@remobile/react-native-cache-image');

var db = Sqlite.openDatabase({name: "my.db"});
module.exports = React.createClass({
    doTest() {
        db.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS test_table');
            tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

            // demonstrate PRAGMA:
            db.executeSql("pragma table_info (test_table);", [], function(res) {
                console.log("PRAGMA res: " + JSON.stringify(res));
            });

            tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
                console.log("insertId: " + res.insertId + " -- probably 1");
                console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

                db.transaction(function(tx) {
                    tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
                        console.log("res.rows.length: " + res.rows.length + " -- should be 1");
                        console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
                    });
                });

            }, function(e) {
                console.log("ERROR: " + e.message);
            });
        });
    },
    select(tx) {
    	tx.executeSql('SELECT * FROM student', [], function (tx, results) {
    		var len = results.rows.length, i;
    		for (i = 0; i < len; i++){
    			console.log(results.rows.item(i).id+':'+results.rows.item(i).log);
    		}
    	}, null);
    },
    add() {
        var self = this;
    	db.transaction(function (tx) {
    		tx.executeSql('CREATE TABLE IF NOT EXISTS student (id integer, log integer)');
    		tx.executeSql('INSERT INTO student (id, log) VALUES (1, 1)');
    		tx.executeSql('INSERT INTO student (id, log) VALUES (2, 2)');
    		tx.executeSql('INSERT INTO student (id, log) VALUES (3, 3)');
    		tx.executeSql('INSERT INTO student (id, log) VALUES (4, 4)');
    		self.select(tx);
    	}, (e)=>{console.log(e)});
    },
    update() {
        var self = this;
    	db.transaction(function (tx) {
    		tx.executeSql('UPDATE student SET log=log+? WHERE id=8', [2], function(tx, rs){
    			if (rs.rowsAffected===0) {
    				tx.executeSql('INSERT INTO student (id, log) VALUES (?, ?)', [8, 8], function(tx, rs){
                        self.select(tx);
    				});
    			} else {
                    self.select(tx);
                }
    		});
    	}, function(a){console.log(a)});
    },
    deleteMin() {
        var self = this;
    	db.transaction(function (tx) {
    		tx.executeSql('DELETE FROM student WHERE id=(SELECT MIN(id) FROM student)', [], function(tx, rs){
    			console.log(rs.rows)
    			});
    		self.select(tx);
    	});
    },
    drop() {
    	db.transaction(function (tx) {
    		tx.executeSql('DROP TABLE student');
    	});
    },
    cacheimage() {
        CacheImage.clear();
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.doTest}>测试</Button>
                <Button onPress={this.add}>add</Button>
                <Button onPress={this.deleteMin}>deleteMin</Button>
                <Button onPress={this.update}>update</Button>
                <Button onPress={this.drop}>drop</Button>
                <Button onPress={this.cacheimage}>cacheimage</Button>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        paddingVertical: 150,
    },
});
