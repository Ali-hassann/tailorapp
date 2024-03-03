import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Alert, TouchableOpacity, Text, StatusBar } from 'react-native';
import AuthService from '../api/auth-service/auth-service';
import CustomHeader from '../utilities/navbar';
import { colors, defaultValues } from '../utilities/Constants/constant';
import Loader from '../utilities/loader';

const SaveClient = ({ route }) => {
    const [tailorClientName, setTailorClientName] = useState('');
    const [tailorClientId, setTailorClientId] = useState(0);
    const [remarks, setRemarks] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [shirtLength, setShirtLength] = useState(0);
    const [trouserLength, setTrouserLength] = useState(0);
    const [paincha, setPaincha] = useState(0);
    const [cuffWidth, setCuffWidth] = useState(0);
    const [pattiWidth, setPattiWidth] = useState(0);
    const [user, setUser] = useState(null);
    const [trouserPocket, setTrouserPocket] = useState(0);
    const [coulerType, setCoulerType] = useState(0);
    const [frontPocket, setFrontPocket] = useState(0);
    const [sidePocket, setSidePocket] = useState(0);
    const [sleeves, setSleeves] = useState(0);
    const [shoulderWidth, setShoulderWidth] = useState(0);
    const [neck, setNeck] = useState(0);
    const [chest, setChest] = useState(0);
    const [back, setBack] = useState(0);
    const [gaira, setGaira] = useState(0);

    const [shirtLengthError, setShirtLengthError] = useState('');
    const [trouserLengthError, setTrouserLengthError] = useState('');
    const [sleevesError, setSleevesError] = useState('');
    const [shoulderWidthError, setShoulderWidthError] = useState('');
    const [neckError, setNeckError] = useState('');
    const [chestError, setChestError] = useState('');
    const [backError, setBackError] = useState('');
    const [gairaError, setGairaError] = useState('');
    const [tailorClientNameError, setTailorClientNameError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const userData = AuthService.getUser();
        setUser(userData);
        const token = AuthService.getUser().Token;

    }, [route.params]);

    const loader = (value) => {
        setIsLoading(value);
    };

    const validateClient = () => {
        let isValid = true;

        if (shirtLength <= 0) {
            setShirtLengthError('Length must be greater then 0.');
            isValid = false;
        } else {
            setShirtLengthError('');
        }

        if (trouserLength <= 0) {
            setTrouserLengthError('Length must be greater then 0.');
            isValid = false;
        } else {
            setTrouserLengthError('');
        }

        if (tailorClientName?.length <= 0) {
            setTailorClientNameError('Enter Name');
            isValid = false;
        } else {
            setTailorClientNameError('');
        }

        if (neck <= 0) {
            setNeckError('Enter neck measurement');
            isValid = false;
        } else {
            setNeckError('');
        }

        if (back <= 0) {
            setBackError('Enter back measurement');
            isValid = false;
        } else {
            setBackError('');
        }

        if (sleeves <= 0) {
            setSleevesError('Enter sleeves measurement');
            isValid = false;
        } else {
            setSleevesError('');
        }

        if (shoulderWidth <= 0) {
            setShoulderWidthError('Enter shoulder measurement');
            isValid = false;
        } else {
            setShoulderWidthError('');
        }

        if (chest <= 0) {
            setChestError('Enter chest measurement');
            isValid = false;
        } else {
            setChestError('');
        }

        if (gaira <= 0) {
            setGairaError('Enter gaira measurement');
            isValid = false;
        } else {
            setGairaError('');
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (validateClient()) {
            let client = {
                TailorClientId: tailorClientId,
                TailorClientName: tailorClientName,
                ShirtLength: shirtLength,
                TrouserLength: trouserLength,
                Paincha: paincha,
                TrouserPocket: trouserPocket,
                CoulerType: coulerType,
                CuffWidth: cuffWidth,
                PattiWidth: pattiWidth,
                FrontPocket: frontPocket,
                SidePocket: sidePocket,
                Sleeves: sleeves,
                ShoulderWidth: shoulderWidth,
                Neck: neck,
                Chest: chest,
                Back: back,
                Gaira: gaira,
                ContactNumber: contactNumber,
                Remarks: remarks,
                OrgId: AuthService.getUser().OrgId,
                BranchId: AuthService.getUser().BranchId,
            };
            try {
                loader(true);
                const token = AuthService.getUser().Token;
                const response = await fetch(`${defaultValues.baseUrl}/Tailor/SaveTailorClient`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(client),
                });
                // console.log(`acc :${selectedOption} \n ${numberInput}\n ${eventType}\n ${new Date().toISOString()}`);
                if (!response.ok) {
                    loader(false);
                    throw new Error('API call failed with status ' + response.status);
                }

                const data = await response.json();
                if (data) {
                    loader(false);
                    Alert.alert("Success", "Client saved successfully!");
                    setRemarks('');
                } else {
                    Alert.alert("Success", "something went wrong please try again");
                }
            } catch (error) {
                loader(false);
                console.error('Error during API call:', error);
                Alert.alert("Error", "Failed to add order");
            }
        } else {
            loader(false);
        }
    };

    return (
        <View >
            <View style={styles.container}>
                <CustomHeader title={route.params?.title} showBackButton={true} />
            </View>
            <View style={styles.mainContainer}>
                <ScrollView>
                    <View style={styles.scroll}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setTailorClientName}
                            value={tailorClientName}
                            placeholder="Enter Name"
                            keyboardType="default"
                            placeholderTextColor="#A0A0A0"
                        />
                        {tailorClientNameError ? <Text style={styles.errorText}>{tailorClientNameError}</Text> : null}
                        <TextInput
                            style={styles.input}
                            onChangeText={setContactNumber}
                            value={contactNumber}
                            placeholder="Enter contact No"
                            keyboardType="default"
                            placeholderTextColor="#A0A0A0"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setRemarks}
                            value={remarks}
                            placeholder="Enter remarks"
                            keyboardType="default"
                            placeholderTextColor="#A0A0A0"
                        />

                        <View style={styles.selectItemRow}>
                            <View style={styles.col4}>
                                <Text>Shirt Length</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setShirtLength}
                                    value={shirtLength.toString()}
                                    placeholder="Enter shirt lenght"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                                {shirtLengthError ? <Text style={styles.errorText}>{shirtLengthError}</Text> : null}
                            </View>
                            <View style={styles.col4}>
                                <Text>Sleeves</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setSleeves}
                                    value={sleeves.toString()}
                                    placeholder="Enter sleeves"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                                {sleevesError ? <Text style={styles.errorText}>{sleevesError}</Text> : null}
                            </View>
                            <View style={styles.col4}>
                                <Text>Shoulder Width</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setShoulderWidth}
                                    value={shoulderWidth.toString()}
                                    placeholder="Enter shoulder width"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                                {shoulderWidthError ? <Text style={styles.errorText}>{shoulderWidthError}</Text> : null}
                            </View>

                        </View>
                        <View style={styles.selectItemRow}>
                            <View style={styles.col4}>
                                <Text>Neck</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setNeck}
                                    value={neck.toString()}
                                    placeholder="Enter shirt lenght"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                                {neckError ? <Text style={styles.errorText}>{neckError}</Text> : null}
                            </View>
                            <View style={styles.col4}>
                                <Text>Chest</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setChest}
                                    value={chest.toString()}
                                    placeholder="Enter chest"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                                {chestError ? <Text style={styles.errorText}>{chestError}</Text> : null}
                            </View>
                            <View style={styles.col4}>
                                <Text>Back</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setBack}
                                    value={back.toString()}
                                    placeholder="Enter back"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                                {backError ? <Text style={styles.errorText}>{backError}</Text> : null}
                            </View>

                        </View>
                        <View style={styles.selectItemRow}>
                            <View style={styles.col4}>
                                <Text>Gaira</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setGaira}
                                    value={gaira.toString()}
                                    placeholder="Enter gaira"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                                {gairaError ? <Text style={styles.errorText}>{gairaError}</Text> : null}
                            </View>
                            <View style={styles.col4}>
                                <Text>Trouser Length</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setTrouserLength}
                                    value={trouserLength.toString()}
                                    placeholder="Enter trouser length"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                                {trouserLengthError ? <Text style={styles.errorText}>{trouserLengthError}</Text> : null}
                            </View>
                            <View style={styles.col4}>
                                <Text>Paincha</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setPaincha}
                                    value={paincha.toString()}
                                    placeholder="Enter paincha"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                                {/* {loseQuantityError ? <Text style={styles.errorText}>{loseQuantityError}</Text> : null} */}
                            </View>
                        </View>

                        <View style={styles.selectItemRow}>
                            <View style={styles.col4}>
                                <Text>Trouser Pocket</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setTrouserPocket}
                                    value={trouserPocket.toString()}
                                    placeholder="Enter trouserPocket"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                            </View>
                            <View style={styles.col4}>
                                <Text>Couler Type</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setCoulerType}
                                    value={coulerType.toString()}
                                    placeholder="Slect couler type"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                            </View>
                            <View style={styles.col4}>
                                <Text>Cuff width</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setCuffWidth}
                                    value={cuffWidth.toString()}
                                    placeholder="Enter cuff width"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                                {/* {loseQuantityError ? <Text style={styles.errorText}>{loseQuantityError}</Text> : null} */}
                            </View>
                        </View>

                        <View style={styles.selectItemRow}>
                            <View style={styles.col4}>
                                <Text>Patti Width</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setPattiWidth}
                                    value={pattiWidth.toString()}
                                    placeholder="Enter pattiWidth"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                            </View>
                            <View style={styles.col4}>
                                <Text>Front Pocket</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setFrontPocket}
                                    value={frontPocket.toString()}
                                    placeholder="Slect front"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                            </View>
                            <View style={styles.col4}>
                                <Text>Side Pocket</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setSidePocket}
                                    value={sidePocket.toString()}
                                    placeholder="Select side pocket"
                                    keyboardType="numeric"
                                    placeholderTextColor="#A0A0A0"
                                />
                                {/* {loseQuantityError ? <Text style={styles.errorText}>{loseQuantityError}</Text> : null} */}
                            </View>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <Loader visible={isLoading} />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        // backgroundColor: colors.neutral, // Light gray background color
        // alignItems: 'center', // Center content horizontally
        // paddingVertical: 20, // Add vertical padding
    },
    mainContainer: {
        // flex:1,
        width: '100%',
        // paddingTop: 50,
        paddingHorizontal: 20,
        alignContent: 'center',
        // paddingTop: StatusBar.currentHeight,
        // backgroundColor: colors.neutral, // Light gray background color
        alignItems: 'center', // Center content horizontally
        // paddingVertical: 20, // Add vertical padding
        flexDirection: 'row'
    },
    pickerTrigger: {
        width: '100%',
        padding: 14,
        marginTopTop: 10,
        backgroundColor: colors.light, // Light background color
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', // Align text and icon horizontally
        borderWidth: 1,
        borderColor: '#D1D1D1',
        shadowColor: colors.dar,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    pickerTriggerText: {
        flex: 1, // Allow text to grow to the right
        color: colors.dar, // Black text color
    },
    errorText: {
        color: colors.danger,
        marginBottom: 10,
    },
    input: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#D1D1D1', // Light gray border color
        borderRadius: 10,
        backgroundColor: colors.light,
        color: colors.dar,
        // width: '20%',
        // marginBottom: 20,
        shadowColor: colors.dar,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 5,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    addButtonContainer: {
        // marginTop: 20,
        width: '100%',
        borderRadius: 20,
        // overflow: 'hidden',
    },
    addButton: {
        backgroundColor: colors.secondary,
        padding: 5,
        marginHorizontal: 10,
        marginTop: 8,
        alignItems: 'center',
        shadowColor: colors.dar,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        alignItems: 'center',
        shadowColor: colors.dar,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: colors.light,
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContent: {
        padding: 20,
        margin: 20,
        backgroundColor: colors.light,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        shadowColor: colors.dar,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    listItemText: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#D1D1D1',
        fontSize: 15,
        color: colors.dar,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: 10,
        padding: 10,
        fontSize: 15,
        marginBottom: 20,
        width: '100%',
        color: colors.dar,
    },
    selectItemRow: {
        flexDirection: 'row',
        marginTop: 10,
        // marginBottom: 10,
        width: '100%',
    },
    col6: {
        width: '49%',
        marginHorizontal: 2
    },
    col4: {
        width: '32%',
        marginHorizontal: 2
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        width: '100%',
    },
    column: {
        // flex: 1,
    },
});

export default SaveClient;