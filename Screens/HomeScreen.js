import React, { useState, useEffect } from 'react';
import CustomHeader from '../utilities/navbar'; // Import the Card component
import AuthService from '../api/auth-service/auth-service';
import Loader from '../utilities/loader';
import { colors, defaultValues } from '../utilities/Constants/constant';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity, TextInput } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]); // State to store your data
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        // Fetch data once subcategoryId is set
        fetchData();
    }, AuthService.getUser().BranchId);

    const loader = (value) => {
        setIsLoading(value);
    };

    const fetchData = async () => {
        console.log("1\n");
        try {
            loader(true);
            const token = AuthService.getUser().Token; // Get the JWT token from AuthService
            const response = await fetch(`${defaultValues.baseUrl}/Tailor/GetTailorClientList`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    BranchId: AuthService.getUser().BranchId,
                    OrgId: AuthService.getUser().OrgId,
                }),
            });

            if (!response.ok) {
                loader(false);
                throw new Error('API call failed with status ' + response.status);
            }

            const fetchData = await response.json();
            setData(fetchData);
            loader(false);
        } catch (error) {
            loader(false);
            console.error('Error fetching data:', error);
        }

        setTimeout(() => {
            // When the API call is complete, hide the loader
            loader(false);
        }, 5000); // Simulated 2-second delay
    };

    const ListItem = ({ item }) => {
        if (!item.TailorClientName?.toLowerCase().includes(searchQuery?.toLowerCase()) && searchQuery?.length > 0) {
            return null; // Don't render the item if it doesn't match the search
        }

        return (
            <View style={styles.itemContainer}>
                <View style={styles.iconAndText}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.TailorClientName}</Text>
                    </View>
                </View>
                {/* {item.LocationName?.length > 0 && (
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.LocationName}</Text>
                    </View>
                )} */}
                <Text style={styles.followButtonText}>{item.ContactNumber}</Text>
            </View>
        );
    };

    return (
        <>
            <View style={styles.container}>
                <CustomHeader title="Clients" showBackButton={false} />
                <Loader visible={isLoading} />
                {(data.length === 0 && isLoading === false) && (<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text >No Data Found</Text>
                </View>)}
                <View style={styles.mainrow}>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                    />

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Client', { eventType: 1, title: 'Save Client' })}>
                            {/* <Ionicons name={""} size={28} color={colors.light} /> */}
                            <Text style={styles.cardTitle}>Add</Text>
                        </TouchableOpacity>
                        {/* <Card title="Save Client" desc="" icon="md-send-sharp" onPress={() => navigation.navigate('Client', { eventType: 1, title: 'Save Client' })} /> */}
                    </View>
                </View>

                {data.length > 0 && (
                    <>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.TailorClientId.toString()}
                            renderItem={ListItem}
                            keyboardShouldPersistTaps="always" // This prop prevents keyboard from closing
                        />
                    </>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'white', // Set a background color to match your design
    },
    mainrow: {
        flexDirection: 'row',
        width: '100%',
        // marginBottom: 20,
    },
    row: {
        width: '10%',
        marginTop: 15,
        // padding: 5,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        borderBlockColor: 'lightgray'
    },
    iconAndText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#aaa', // This should be the color of your icon
        marginRight: 10,
    },
    textContainer: {
        justifyContent: 'center',
        maxWidth: 110,
        minWidth: 100,
    },
    title: {
        fontWeight: '300',
    },

    followButtonText: {

        fontWeight: 'bold',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        margin: 10,
        borderRadius: 5,
        width: '80%'
    },
    card: {
        backgroundColor: colors.primary,
        borderRadius: 6,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
        backgroundColor: colors.primary
    },
    cardTitle: {
        // Add your text styling here
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.light,
    },
});

export default HomeScreen;