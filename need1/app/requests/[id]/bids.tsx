import type React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../../components/Card';
import { Badge } from '../../../components/Badge';
import { Button } from '../../../components/Button';
import { api } from '../../../lib/api';
import type { Offer } from '../../../types';

export default function BidsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [bids, setBids] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const data = await api.getBidsForRequest(id);
        setBids(data);
      } catch (error) {
        console.error('Failed to fetch bids:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [id]);

  const handleAcceptBid = (bid: Offer) => {
    Alert.alert('Accept Bid', `Accept ${bid.bidder.name}'s bid for $${bid.amount}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Accept',
        onPress: async () => {
          try {
            await api.acceptBid(bid.id);
            // Refresh bids
            const updatedBids = await api.getBidsForRequest(id);
            setBids(updatedBids);
          } catch (error) {
            console.error('Failed to accept bid:', error);
          }
        },
      },
    ]);
  };

  const handleDeclineBid = (bid: Offer) => {
    Alert.alert('Decline Bid', `Decline ${bid.bidder.name}'s bid?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Decline',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.declineBid(bid.id);
            // Refresh bids
            const updatedBids = await api.getBidsForRequest(id);
            setBids(updatedBids);
          } catch (error) {
            console.error('Failed to decline bid:', error);
          }
        },
      },
    ]);
  };

  const renderBidItem = ({ item }: { item: Offer }) => (
    <>
      <Card className="p-4 mb-3">
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View className="w-10 h-10 rounded-full bg-primary-100 mr-3 items-center justify-center">
                <Ionicons name="person" size={20} color="#2d5a2d" />
              </View>
              <View>
                <Text className="text-lg font-semibold text-gray-900">{item.bidder.name}</Text>
                <Text className="text-sm text-gray-600">{item.bidder.major}</Text>
              </View>
            </View>
            <Text className="text-gray-700 mb-2">{item.message}</Text>
          </View>
          <View className="items-end">
            <Text className="text-2xl font-bold text-primary-600">${item.amount}</Text>
            <Text className="text-xs text-gray-500">Bid Amount</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#6b7280" />
            <Text className="text-sm text-gray-600 ml-2">
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <Badge type="karma" value={item.bidder.karmaScore} size="sm" />
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#fbbf24" />
            <Text className="text-sm text-gray-600 ml-1">4.8 rating</Text>
          </View>

        </View>
      </Card>
      <Card className="p-3 mb-3">
        <View className="flex-row justify-center space-x-3">
          <Button
            title="Accept"
            onPress={() => handleAcceptBid(item)}
            variant="success"
            size="sm"
            className="flex-1"
          />
          <Button
            title="Decline"
            onPress={() => handleDeclineBid(item)}
            variant="danger"
            size="sm"
            className="flex-1"
          />
        </View>
      </Card>
    </>
  );

  if (loading) {
    return (
      <View className="flex-1 bg-secondary-50">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600">Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-secondary-50">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-secondary-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#6b7280" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Bids Received</Text>
        <View className="w-6" />
      </View>

      {/* Content */}
      <View className="flex-1 p-4">
        {bids.length > 0 ? (
          <FlatList
            data={bids}
            keyExtractor={(item) => item.id}
            renderItem={renderBidItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 0 }}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Card className="p-6 items-center">
              <Ionicons name="people-outline" size={48} color="#6b7280" />
              <Text className="text-lg font-semibold text-gray-900 mt-4 mb-2">No Bids Yet</Text>
              <Text className="text-gray-600 text-center">
                Bids will appear here when students express interest in your request.
              </Text>
            </Card>
          </View>
        )}
      </View>
    </View>
  );
}
