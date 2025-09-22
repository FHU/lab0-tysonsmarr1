import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Collapsible } from '@/components/Collapsible';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const features = [
    'Prime Numbers',
    'Palindromes', 
    'Pythagorean Triples',
    'Perfect Powers',
    'Narcissistic Numbers',
    'Date Equations'
  ];

  const steps = [
    'Tap the "Calculate" tab below',
    'Enter your day, month, and year',
    'Press "Analyze Date" to see the magic',
    'Explore the patterns and colors!'
  ];

  const facts = [
    '• The number 371 is narcissistic: 3³ + 7³ + 1³ = 371',
    '• 12321 is both a palindrome AND a perfect square (111²)',
    '• The date 3/4/5 forms a Pythagorean triple: 3² + 4² = 5²',
    '• Some dates create the same hex color in different formats!'
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.headerCard}>
          <View style={styles.headerNumber}>
            <ThemedText style={styles.headerNumberText}>📱</ThemedText>
          </View>
          <ThemedText style={styles.headerTitle}>Math Date</ThemedText>
          <View style={styles.headerDivider} />
          <View style={styles.headerContent}>
            <ThemedText style={styles.bulletPoint}>• Discover hidden patterns in dates.</ThemedText>
            <ThemedText style={styles.bulletPoint}>• Mathematical magic everywhere.</ThemedText>
            <ThemedText style={styles.bulletPoint}>• Your date, analyzed instantly.</ThemedText>
          </View>
        </View>

    
        <View style={styles.infoCard}>
          <ThemedText style={styles.cardTitle}>🎯 What This App Does</ThemedText>
          <ThemedText style={styles.cardText}>
            Enter any date and discover the mathematical patterns hidden within! 
            Every date contains surprising mathematical properties waiting to be uncovered.
          </ThemedText>
          <Collapsible title="Learn More">
            <ThemedText style={styles.explanationText}>
              This app analyzes dates for prime numbers, palindromes, perfect powers, 
              Pythagorean triples, narcissistic numbers, mathematical equations, 
              and even generates unique colors from your date values.
            </ThemedText>
          </Collapsible>
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.cardTitle}>🔢 Mathematical Patterns</ThemedText>
          <ThemedText style={styles.cardText}>
            We check your date for these amazing mathematical properties:
          </ThemedText>
          <View style={styles.featuresList}>
            {features.map((feature, index) => (
              <ThemedText key={index} style={styles.featureItem}>• {feature}</ThemedText>
            ))}
          </View>
          <Collapsible title="What Are These?">
            <ThemedText style={styles.explanationText}>
              Each pattern represents a unique mathematical property. For example, 
              prime numbers only divide by 1 and themselves, while palindromes 
              read the same forwards and backwards. Perfect powers are numbers 
              like 8 = 2³ or 16 = 4².
            </ThemedText>
          </Collapsible>
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.cardTitle}>🎨 Color Generation</ThemedText>
          <ThemedText style={styles.cardText}>
            Your date becomes art! We convert your date values into:
          </ThemedText>
          <View style={styles.featuresList}>
            <ThemedText style={styles.featureItem}>• Hex Color Codes (#RRGGBB)</ThemedText>
            <ThemedText style={styles.featureItem}>• HSL Color Values</ThemedText>
            <ThemedText style={styles.featureItem}>• Visual Color Swatches</ThemedText>
          </View>
          <Collapsible title="How Does This Work?">
            <ThemedText style={styles.explanationText}>
              We take your day, month, and year values and convert them into 
              hexadecimal and HSL color formats. This creates unique colors 
              that represent your specific date - like a mathematical fingerprint!
            </ThemedText>
          </Collapsible>
        </View>

       
        <View style={styles.exampleCard}>
          <View style={styles.headerNumber}>
            <ThemedText style={styles.headerNumberText}>💡</ThemedText>
          </View>
          <ThemedText style={styles.headerTitle}>Try an Example</ThemedText>
          <View style={styles.headerDivider} />
          <View style={styles.headerContent}>
            <ThemedText style={styles.bulletPoint}>• Try date: 9/27/2025</ThemedText>
            <ThemedText style={styles.bulletPoint}>• Creates number: 9272025</ThemedText>
            <ThemedText style={styles.bulletPoint}>• Which equals: 3045²</ThemedText>
            <ThemedText style={styles.bulletPoint}>• A perfect square!</ThemedText>
          </View>
        </View>

        
        <View style={styles.infoCard}>
          <ThemedText style={styles.cardTitle}>🚀 How to Use</ThemedText>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <ThemedText style={styles.stepNumberText}>{index + 1}</ThemedText>
              </View>
              <ThemedText style={styles.stepText}>{step}</ThemedText>
            </View>
          ))}
        </View>

      
        <TouchableOpacity 
          style={styles.ctaButton} 
          onPress={() => router.push('/(tabs)/explore')}
        >
          <ThemedText style={styles.ctaButtonText}>Start Analyzing Dates! 🎯</ThemedText>
        </TouchableOpacity>

      
        <View style={styles.infoCard}>
          <ThemedText style={styles.cardTitle}>🤓 Fun Mathematical Facts</ThemedText>
          <Collapsible title="Did You Know?">
            <View style={styles.factContainer}>
              {facts.map((fact, index) => (
                <ThemedText key={index} style={styles.factText}>{fact}</ThemedText>
              ))}
            </View>
          </Collapsible>
        </View>

        
        <View style={styles.infoCard}>
          <ThemedText style={styles.cardTitle}>ℹ️ About This App</ThemedText>
          <ThemedText style={styles.cardText}>
            Created to explore the fascinating mathematical properties hidden in everyday dates. 
            Mathematics is everywhere - even in the calendar!
          </ThemedText>
          <Collapsible title="Technical Details">
            <ThemedText style={styles.explanationText}>
              This app analyzes dates by converting them into various numerical formats 
              and checking each against mathematical patterns. It combines number theory, 
              color theory, and date arithmetic to reveal hidden beauty in numbers.
            </ThemedText>
          </Collapsible>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8A5A5',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
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
  infoCard: {
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
  exampleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700', // Gold accent for example
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  featuresList: {
    marginBottom: 15,
    paddingLeft: 10,
  },
  featureItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
  explanationText: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
    marginTop: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    backgroundColor: '#FF6B9D',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  ctaButton: {
    backgroundColor: '#FF6B9D',
    borderRadius: 25,
    paddingVertical: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  factContainer: {
    marginTop: 10,
  },
  factText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    paddingLeft: 10,
  },
  bottomSpacing: {
    height: 50,
  },
});