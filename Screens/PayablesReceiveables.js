import React, { useState, useEffect } from 'react';
import AuthService from '../api/auth-service/auth-service';
import { View, Text, StyleSheet, FlatList, StatusBar, TextInput } from 'react-native';
import CustomHeader from '../utilities/navbar';
import { defaultValues } from '../utilities/Constants/constant';
import Loader from '../utilities/loader';

const PayablesReceiveables = ({ route }) => {
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
        try {
            console.log("s\n");
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

        // setTimeout(() => {
        //     // When the API call is complete, hide the loader
        //     loader(false);
        // }, 5000); // Simulated 2-second delay
    };

    const ListItem = ({ item }) => {
        if (!item.PostingAccountName?.toLowerCase().includes(searchQuery?.toLowerCase()) && searchQuery?.length > 0) {
            return null; // Don't render the item if it doesn't match the search
        }

        return (
            <View style={styles.itemContainer}>
                <View style={styles.iconAndText}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.PostingAccountName}</Text>
                    </View>
                </View>
                {item.LocationName?.length > 0 && (
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.LocationName}</Text>
                    </View>
                )}
                <Text style={styles.followButtonText}>{item.ClosingBalance}</Text>
            </View>
        );
    };

    return (
        <>
            <View style={styles.container}>
                <CustomHeader title={route.params?.title} showBackButton={true} />
                <Loader visible={isLoading} />
                {(data.length === 0 && isLoading === false) && (<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text >No Data Found</Text>
                </View>)}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
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
        marginTop: 20, // Space at the top to prevent overlap with the header
        marginTop: StatusBar.currentHeight
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
    },
});

export default PayablesReceiveables;