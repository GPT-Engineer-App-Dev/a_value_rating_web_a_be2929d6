import React, { useState } from "react";
import { Box, Heading, Text, Button, VStack, Input, Checkbox, CheckboxGroup, Stack, Flex, OrderedList, ListItem } from "@chakra-ui/react";

const values = ["Honesty", "Loyalty", "Respect", "Responsibility", "Compassion", "Courage", "Perseverance", "Integrity", "Gratitude", "Forgiveness", "Humility", "Kindness", "Patience", "Self-discipline", "Tolerance"];

const Index = () => {
  const [step, setStep] = useState(1);
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [comparisonResults, setComparisonResults] = useState({});

  const handleStart = () => setStep(2);

  const handleValueSelection = (selectedItems) => {
    setSelectedValues(selectedItems);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredValues = values.filter((value) => value.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleComparison = (value1, value2) => {
    setComparisonResults((prevResults) => ({
      ...prevResults,
      [value1]: (prevResults[value1] || 0) + 1,
      [value2]: prevResults[value2] || 0,
    }));

    if (Object.keys(comparisonResults).length === 44) {
      setStep(4);
    }
  };

  const sortedValues = selectedValues.sort((a, b) => (comparisonResults[b] || 0) - (comparisonResults[a] || 0));

  return (
    <Box p={8}>
      {step === 1 && (
        <VStack spacing={8}>
          <Heading>Welcome to the Value Rating App</Heading>
          <Text>This app helps you prioritize your personal values by comparing them against each other.</Text>
          <Button colorScheme="blue" onClick={handleStart}>
            Start Rating
          </Button>
        </VStack>
      )}

      {step === 2 && (
        <VStack spacing={8}>
          <Heading>Select Your Top 10 Values</Heading>
          <Input placeholder="Search values..." value={searchTerm} onChange={handleSearch} />
          <CheckboxGroup colorScheme="green" defaultValue={selectedValues} onChange={handleValueSelection}>
            <Stack spacing={2}>
              {filteredValues.map((value) => (
                <Checkbox key={value} value={value} isDisabled={selectedValues.length >= 10 && !selectedValues.includes(value)}>
                  {value}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
          <Button colorScheme="blue" isDisabled={selectedValues.length < 10} onClick={() => setStep(3)}>
            Next
          </Button>
        </VStack>
      )}

      {step === 3 && (
        <VStack spacing={8}>
          <Heading>Compare Values</Heading>
          {selectedValues.map((value1, index1) =>
            selectedValues.slice(index1 + 1).map((value2, index2) => (
              <Flex key={`${value1}-${value2}`} justify="center">
                <Button colorScheme="blue" mr={4} onClick={() => handleComparison(value1, value2)}>
                  {value1}
                </Button>
                <Text>vs</Text>
                <Button colorScheme="green" ml={4} onClick={() => handleComparison(value2, value1)}>
                  {value2}
                </Button>
              </Flex>
            )),
          )}
        </VStack>
      )}

      {step === 4 && (
        <VStack spacing={8}>
          <Heading>Your Value Rankings</Heading>
          <OrderedList>
            {sortedValues.map((value) => (
              <ListItem key={value}>
                {value} - {comparisonResults[value]} wins
              </ListItem>
            ))}
          </OrderedList>
          <Button colorScheme="blue" onClick={() => setStep(1)}>
            Start Over
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Index;
