import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const STORAGE_KEY = '@budget_data';
const WIDGET_KEY = '@widget_balance';

export default function App() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
    updateWidget();
  }, [balance, transactions]);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        setBalance(parsed.balance || 0);
        setTransactions(parsed.transactions || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      const data = { balance, transactions };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const updateWidget = async () => {
    try {
      // Store balance for widget to read
      await AsyncStorage.setItem(WIDGET_KEY, balance.toFixed(2));
      
      // On iOS, you can trigger widget refresh using shared UserDefaults
      // On Android, you can use AppWidget updates
      if (Platform.OS === 'ios') {
        // iOS widget will read from shared UserDefaults/App Groups
        console.log('Widget data updated for iOS');
      } else if (Platform.OS === 'android') {
        // Android widget update mechanism
        console.log('Widget data updated for Android');
      }
    } catch (error) {
      console.error('Error updating widget:', error);
    }
  };

  const addTransaction = (type) => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive number');
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      type,
      amount: amt,
      description: description || (type === 'income' ? 'Income' : 'Expense'),
      date: new Date().toISOString()
    };

    const newBalance = type === 'income' 
      ? balance + amt 
      : balance - amt;

    setBalance(newBalance);
    setTransactions([newTransaction, ...transactions]);
    setAmount('');
    setDescription('');
  };

  const deleteTransaction = (id) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      const newBalance = transaction.type === 'income'
        ? balance - transaction.amount
        : balance + transaction.amount;
      
      setBalance(newBalance);
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const formatCurrency = (value) => {
    return `$${Math.abs(value).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderTransaction = ({ item }) => (
    <TouchableOpacity
      style={styles.transactionItem}
      onLongPress={() => {
        Alert.alert(
          'Delete Transaction',
          'Are you sure you want to delete this transaction?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: () => deleteTransaction(item.id), style: 'destructive' }
          ]
        );
      }}
    >
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
      </View>
      <Text style={[
        styles.transactionAmount,
        item.type === 'income' ? styles.incomeAmount : styles.expenseAmount
      ]}>
        {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Budget Tracker</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={[
            styles.balanceAmount,
            balance >= 0 ? styles.positiveBalance : styles.negativeBalance
          ]}>
            {balance >= 0 ? '' : '-'}{formatCurrency(balance)}
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#999"
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.incomeButton]}
            onPress={() => addTransaction('income')}
          >
            <Text style={styles.buttonText}>+ Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.expenseButton]}
            onPress={() => addTransaction('expense')}
          >
            <Text style={styles.buttonText}>- Expense</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        {transactions.length === 0 ? (
          <Text style={styles.emptyText}>No transactions yet. Add your first transaction above!</Text>
        ) : (
          <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.transactionsList}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 30,
    paddingTop: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  positiveBalance: {
    color: '#4ade80',
  },
  negativeBalance: {
    color: '#f87171',
  },
  inputContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  incomeButton: {
    backgroundColor: '#4ade80',
  },
  expenseButton: {
    backgroundColor: '#f87171',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionsContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  transactionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  transactionsList: {
    paddingBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  incomeAmount: {
    color: '#4ade80',
  },
  expenseAmount: {
    color: '#f87171',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 40,
  },
});
