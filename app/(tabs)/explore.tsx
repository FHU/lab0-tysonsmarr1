import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Collapsible } from '@/components/Collapsible';


export default function TabTwoScreen() {
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2024);
  const [results, setResults] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);


  // Generate arrays for dropdowns
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 2500 }, (_, i) => i + 1);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const validateInput = () => {
    const newErrors: any = {};
    
    if (day < 1 || day > 31) {
      newErrors.day = 'Day must be between 1 and 31';
    }
    if (month < 1 || month > 12) {
      newErrors.month = 'Month must be between 1 and 12';
    }
    if (year < 1 || year > 2500) {
      newErrors.year = 'Year must be between 1 and 2500';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const isPalindrome = (num: number): boolean => {
    const str = num.toString();
    return str === str.split('').reverse().join('');
  };

  const isPerfectPower = (num: number) => {
    for (let power = 2; power <= 9; power++) {
      const root = Math.round(Math.pow(num, 1/power));
      if (Math.pow(root, power) === num) {
        return { isPower: true, base: root, power: power };
      }
    }
    return { isPower: false };
  };

  const isNarcissistic = (num: number): boolean => {
    const str = num.toString();
    const digits = str.split('').map(Number);
    const numDigits = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, numDigits), 0);
    return sum === num;
  };

  const checkEquations = (d: number, m: number, y: number): string[] => {
    const equations: string[] = [];
    if (d + m === y) equations.push(`${d} + ${m} = ${y}`);
    if (d - m === y) equations.push(`${d} - ${m} = ${y}`);
    if (d * m === y) equations.push(`${d} × ${m} = ${y}`);
    if (m !== 0 && d / m === y) equations.push(`${d} ÷ ${m} = ${y}`);
    if (Math.pow(d, m) === y) equations.push(`${d}^${m} = ${y}`);
    return equations;
  };

  const generateHexFromDate = (d: number, m: number, y: number): string => {
    // Use different mathematical operations to generate RGB values
    const r = 80 + ((d * 7) % 120); // Red: 80-199
    const g = 60 + ((m * 13) % 140); // Green: 60-199  
    const b = 70 + ((y % 100) * 2) % 130; // Blue: 70-199
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const analyzeDate = () => {
    if (!validateInput()) return;

    const d = day;
    const m = month;
    const y = year;

    // Create only the concatenated numbers we actually use for analysis
    const concatenatedNumbers = [
      parseInt(`${m.toString().padStart(2, '0')}${d.toString().padStart(2, '0')}${(y % 100).toString().padStart(2, '0')}`),
      parseInt(`${d.toString().padStart(2, '0')}${m.toString().padStart(2, '0')}${(y % 100).toString().padStart(2, '0')}`),
      parseInt(`${m.toString().padStart(2, '0')}${d.toString().padStart(2, '0')}${y}`),
      parseInt(`${d.toString().padStart(2, '0')}${m.toString().padStart(2, '0')}${y}`)
    ];
    
    const allNumbers = [d, m, y, ...concatenatedNumbers];

    // Color analysis - moved up for better organization
    const hexColors = {
      mmddyy: generateHexFromDate(m, d, y % 100),
      ddmmyy: generateHexFromDate(d, m, y % 100)
    };

    const hslColors = {
      mmddyy: `hsl(${(m * d + y) % 360}, ${Math.max(40, Math.min(90, d * 3 + 30))}%, ${Math.max(35, Math.min(75, m * 2 + 40))}%)`,
      ddmmyy: `hsl(${(d * m + y) % 360}, ${Math.max(40, Math.min(90, m * 4 + 25))}%, ${Math.max(35, Math.min(75, d * 3 + 35))}%)`
    };

    // Optimized analysis - single pass through numbers
    const primeResults = allNumbers.filter(isPrime);
    const palindromeResults = allNumbers.filter(isPalindrome);
    const powerResults = allNumbers.map(num => ({
      num,
      ...isPerfectPower(num)
    })).filter(result => result.isPower);
    const narcissisticResults = allNumbers.filter(isNarcissistic);

    setResults({
      prime: primeResults,
      palindrome: palindromeResults,
      pythagorean: d*d + m*m === y*y,
      perfectPower: powerResults,
      narcissistic: narcissisticResults,
      equations: checkEquations(d, m, y),
      hexColors,
      hslColors,
      originalDate: { d, m, y }
    });
  };



  const DropdownPicker = ({ 
    visible, 
    onClose, 
    data, 
    selectedValue, 
    onSelect, 
    title,
    renderItem 
  }: {
    visible: boolean;
    onClose: () => void;
    data: number[];
    selectedValue: number;
    onSelect: (value: number) => void;
    title: string;
    renderItem?: (item: number) => string;
  }) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>Select {title}</ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <ThemedText style={styles.closeButtonText}>×</ThemedText>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.toString()}
            style={styles.pickerList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.pickerItem,
                  item === selectedValue && styles.selectedPickerItem
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <ThemedText style={[
                  styles.pickerItemText,
                  item === selectedValue && styles.selectedPickerItemText
                ]}>
                  {renderItem ? renderItem(item) : item.toString()}
                </ThemedText>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={true}
            getItemLayout={(data, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
            initialScrollIndex={Math.max(0, data.indexOf(selectedValue))}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
   
        <View style={styles.headerCard}>
          <View style={styles.headerNumber}>
            <ThemedText style={styles.headerNumberText}>📅</ThemedText>
          </View>
          <ThemedText style={styles.headerTitle}>Math Date</ThemedText>
          <View style={styles.headerDivider} />
          <View style={styles.headerContent}>
            <ThemedText style={styles.bulletPoint}>• Discover mathematical patterns.</ThemedText>
            <ThemedText style={styles.bulletPoint}>• Hidden in every date.</ThemedText>
            <ThemedText style={styles.bulletPoint}>• Enter your date below.</ThemedText>
          </View>
        </View>


        <TouchableOpacity 
          style={styles.inputCard} 
          onPress={() => setShowDayPicker(true)}
        >
          <ThemedText style={styles.inputLabel}>Day:</ThemedText>
          <View style={styles.dropdownButton}>
            <ThemedText style={styles.dropdownText}>{day.toString().padStart(2, '0')}</ThemedText>
            <ThemedText style={styles.dropdownArrow}>▼</ThemedText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.inputCard} 
          onPress={() => setShowMonthPicker(true)}
        >
          <ThemedText style={styles.inputLabel}>Month:</ThemedText>
          <View style={styles.dropdownButton}>
            <ThemedText style={styles.dropdownText}>{month.toString().padStart(2, '0')}</ThemedText>
            <ThemedText style={styles.dropdownArrow}>▼</ThemedText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.inputCard} 
          onPress={() => setShowYearPicker(true)}
        >
          <ThemedText style={styles.inputLabel}>Year:</ThemedText>
          <View style={styles.dropdownButton}>
            <ThemedText style={styles.dropdownText}>{year}</ThemedText>
            <ThemedText style={styles.dropdownArrow}>▼</ThemedText>
          </View>
        </TouchableOpacity>

        {/* Dropdown Pickers */}
        <DropdownPicker
          visible={showDayPicker}
          onClose={() => setShowDayPicker(false)}
          data={days}
          selectedValue={day}
          onSelect={setDay}
          title="Day"
        />

        <DropdownPicker
          visible={showMonthPicker}
          onClose={() => setShowMonthPicker(false)}
          data={months}
          selectedValue={month}
          onSelect={setMonth}
          title="Month"
          renderItem={(item) => `${item.toString().padStart(2, '0')} - ${monthNames[item - 1]}`}
        />

        <DropdownPicker
          visible={showYearPicker}
          onClose={() => setShowYearPicker(false)}
          data={years}
          selectedValue={year}
          onSelect={setYear}
          title="Year"
        />

        {/* Error Messages */}
        {Object.keys(errors).length > 0 && (
          <View style={styles.errorCard}>
            {errors.day && <ThemedText style={styles.errorText}>• {errors.day}</ThemedText>}
            {errors.month && <ThemedText style={styles.errorText}>• {errors.month}</ThemedText>}
            {errors.year && <ThemedText style={styles.errorText}>• {errors.year}</ThemedText>}
          </View>
        )}

        {/* Analyze Button */}
        <TouchableOpacity style={styles.analyzeButton} onPress={analyzeDate}>
          <ThemedText style={styles.analyzeButtonText}>Analyze Date</ThemedText>
        </TouchableOpacity>

        {/* Results */}
        {results && (
          <View style={styles.resultsContainer}>
            {/* Results Header */}
            <View style={styles.resultsHeaderCard}>
              <View style={styles.headerNumber}>
                <ThemedText style={styles.headerNumberText}>✨</ThemedText>
              </View>
              <ThemedText style={styles.headerTitle}>Results</ThemedText>
              <View style={styles.headerDivider} />
              <ThemedText style={styles.dateText}>
                {results.originalDate.m}/{results.originalDate.d}/{results.originalDate.y}
              </ThemedText>
            </View>

            {/* Pattern Cards */}
            <View style={styles.patternCard}>
              <ThemedText style={styles.patternTitle}>🔢 Prime Numbers</ThemedText>
              <ThemedText style={styles.patternResult}>
                {results.prime.length > 0 ? `✓ Found: ${results.prime.join(', ')}` : '✗ None found'}
              </ThemedText>
              <Collapsible title="What are Prime Numbers?">
                <ThemedText style={styles.explanationText}>
                  A prime number has no divisors other than 1 and itself. Examples: 2, 3, 5, 7, 11...
                </ThemedText>
              </Collapsible>
            </View>

            <View style={styles.patternCard}>
              <ThemedText style={styles.patternTitle}>🔄 Palindromes</ThemedText>
              <ThemedText style={styles.patternResult}>
                {results.palindrome.length > 0 ? `✓ Found: ${results.palindrome.join(', ')}` : '✗ None found'}
              </ThemedText>
              <Collapsible title="What are Palindromes?">
                <ThemedText style={styles.explanationText}>
                  Numbers that read the same forwards and backwards. Examples: 121, 1331, 12321...
                </ThemedText>
              </Collapsible>
            </View>

            <View style={styles.patternCard}>
              <ThemedText style={styles.patternTitle}>📐 Pythagorean Triple</ThemedText>
              <ThemedText style={styles.patternResult}>
                {results.pythagorean ? `✓ ${results.originalDate.d}² + ${results.originalDate.m}² = ${results.originalDate.y}²` : '✗ Not a triple'}
              </ThemedText>
              <Collapsible title="What are Pythagorean Triples?">
                <ThemedText style={styles.explanationText}>
                  Three numbers where a² + b² = c². Famous example: 3² + 4² = 5²
                </ThemedText>
              </Collapsible>
            </View>

            <View style={styles.patternCard}>
              <ThemedText style={styles.patternTitle}>⚡ Perfect Powers</ThemedText>
              <ThemedText style={styles.patternResult}>
                {results.perfectPower.length > 0 ? `✓ Found: ${results.perfectPower.map((p: any) => `${p.num}=${p.base}^${p.power}`).join(', ')}` : '✗ None found'}
              </ThemedText>
              <Collapsible title="What are Perfect Powers?">
                <ThemedText style={styles.explanationText}>
                  Numbers that equal another number raised to a power. Example: 8 = 2³, 16 = 4²
                </ThemedText>
              </Collapsible>
            </View>

            <View style={styles.patternCard}>
              <ThemedText style={styles.patternTitle}>💫 Narcissistic Numbers</ThemedText>
              <ThemedText style={styles.patternResult}>
                {results.narcissistic.length > 0 ? `✓ Found: ${results.narcissistic.join(', ')}` : '✗ None found'}
              </ThemedText>
              <Collapsible title="What are Narcissistic Numbers?">
                <ThemedText style={styles.explanationText}>
                  Numbers equal to the sum of their digits raised to the power of digit count. Example: 371 = 3³ + 7³ + 1³
                </ThemedText>
              </Collapsible>
            </View>

            <View style={styles.patternCard}>
              <ThemedText style={styles.patternTitle}>🧮 Date Equations</ThemedText>
              <ThemedText style={styles.patternResult}>
                {results.equations.length > 0 ? `✓ Found: ${results.equations.join(', ')}` : '✗ No equations'}
              </ThemedText>
              <Collapsible title="What are Date Equations?">
                <ThemedText style={styles.explanationText}>
                  Mathematical relationships between day, month, and year using +, -, ×, ÷, or ^
                </ThemedText>
              </Collapsible>
            </View>

            {/* Color Analysis */}
            <View style={styles.colorCard}>
              <ThemedText style={styles.patternTitle}>🎨 Hex Colors</ThemedText>
              <View style={styles.colorRow}>
                <View style={styles.colorItem}>
                  <View style={[styles.colorSwatch, { backgroundColor: results.hexColors.mmddyy }]} />
                  <ThemedText style={styles.colorLabel}>{results.hexColors.mmddyy}</ThemedText>
                  <ThemedText style={styles.colorFormat}>MM/DD/YY</ThemedText>
                </View>
                <View style={styles.colorItem}>
                  <View style={[styles.colorSwatch, { backgroundColor: results.hexColors.ddmmyy }]} />
                  <ThemedText style={styles.colorLabel}>{results.hexColors.ddmmyy}</ThemedText>
                  <ThemedText style={styles.colorFormat}>DD/MM/YY</ThemedText>
                </View>
              </View>
              <Collapsible title="About Hex Colors">
                <ThemedText style={styles.explanationText}>
                  Your date values converted to hexadecimal color codes, creating unique colors from your date.
                </ThemedText>
              </Collapsible>
            </View>

            <View style={styles.colorCard}>
              <ThemedText style={styles.patternTitle}>🌈 HSL Colors</ThemedText>
              <View style={styles.colorRow}>
                <View style={styles.colorItem}>
                  <View style={[styles.colorSwatch, { backgroundColor: results.hslColors.mmddyy }]} />
                  <ThemedText style={styles.colorLabel}>{results.hslColors.mmddyy}</ThemedText>
                  <ThemedText style={styles.colorFormat}>hsl(MM,DD%,YY%)</ThemedText>
                </View>
                <View style={styles.colorItem}>
                  <View style={[styles.colorSwatch, { backgroundColor: results.hslColors.ddmmyy }]} />
                  <ThemedText style={styles.colorLabel}>{results.hslColors.ddmmyy}</ThemedText>
                  <ThemedText style={styles.colorFormat}>hsl(DD,MM%,YY%)</ThemedText>
                </View>
              </View>
              <Collapsible title="About HSL Colors">
                <ThemedText style={styles.explanationText}>
                  Colors using Hue, Saturation, Lightness values derived from your date components.
                </ThemedText>
              </Collapsible>
            </View>
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8A5A5', // Pink background like your design
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60, // Added top spacing to move content down
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerNumber: {
    width: 50,
    height: 30,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerNumberText: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 15,
  },
  headerContent: {
    paddingLeft: 10,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputLabel: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
    flex: 1,
  },
  textInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 80,
    color: '#333',
  },
  dropdownButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    minWidth: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '80%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6B9D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pickerList: {
    maxHeight: 300,
  },
  pickerItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    height: 50,
    justifyContent: 'center',
  },
  selectedPickerItem: {
    backgroundColor: '#FFE5F1',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedPickerItemText: {
    fontWeight: 'bold',
    color: '#FF6B9D',
  },
  errorCard: {
    backgroundColor: '#FFE5E5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  errorText: {
    color: '#D63384',
    fontSize: 14,
    marginBottom: 2,
  },
  analyzeButton: {
    backgroundColor: '#FF6B9D',
    borderRadius: 25,
    paddingVertical: 18,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultsContainer: {
    marginTop: 10,
  },
  resultsHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  patternCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  patternTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  patternResult: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
    marginTop: 10,
  },
  colorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  colorItem: {
    alignItems: 'center',
  },
  colorSwatch: {
    width: 60,
    height: 40,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  colorLabel: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#666',
    marginBottom: 4,
  },
  colorFormat: {
    fontSize: 10,
    color: '#AAA',
  },
  bottomSpacing: {
    height: 50,
  },
});