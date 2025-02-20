import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5, AntDesign, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const DeFiFarmingApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'buyer' or 'seller'
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('buy');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const categories = [
    { id: '1', name: 'All', icon: 'apps' },
    { id: '2', name: 'Vegetables', icon: 'leaf' },
    { id: '3', name: 'Fruits', icon: 'nutrition' },
    { id: '4', name: 'Dairy', icon: 'water' },
    { id: '5', name: 'Grains', icon: 'grain' },
  ];

  const [showProductDetail, setShowProductDetail] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const [showChat, setShowChat] = useState(false);
const [messages, setMessages] = useState([]);

// Sample chat messages
const initialMessages = [
  {
    id: 1,
    senderId: 'farmer1',
    receiverId: 'user1',    message: 'Hello, I\'m interested in your organic tomatoes',
    timestamp: '10:30 AM',
    isRead: true,
  },
  {
    id: 2,
    senderId: 'farmer1',
    receiverId: 'user1',
    message: 'They are freshly harvested today',
    timestamp: '10:31 AM',
    isRead: true,
  },
];

const ChatModal = () => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={showChat}
    onRequestClose={() => setShowChat(false)}
  >
    <View style={styles.chatModalContainer}>
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => setShowChat(false)}>
          <AntDesign name="close" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.chatHeaderInfo}>
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=farmer%20profile%20picture%20professional&aspect=1:1' }}
            style={styles.chatProfilePic}
          />
          <View>
            <Text style={styles.chatName}>Ram Kumar</Text>
            <Text style={styles.chatStatus}>Online</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="call" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.chatMessages}>
        {initialMessages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.senderId === 'user1' ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.message}</Text>
            <Text style={styles.messageTime}>{msg.timestamp}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.chatInputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="attach" size={24} color="#666" />
        </TouchableOpacity>
        <TextInput
          style={styles.chatInput}
          placeholder="Type a message..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const ProductDetailModal = () => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={showProductDetail}
    onRequestClose={() => setShowProductDetail(false)}
  >
    <View style={styles.detailModalContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: selectedProduct?.image }}
          style={styles.detailImage}
        />
        <TouchableOpacity
          style={styles.closeDetailButton}
          onPress={() => setShowProductDetail(false)}
        >
          <AntDesign name="close" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.detailContent}>
          <View style={styles.detailHeader}>
            <View>
              <Text style={styles.detailTitle}>{selectedProduct?.name}</Text>
              <Text style={styles.detailPrice}>{selectedProduct?.price}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteDetailButton}>
              <AntDesign name="heart" size={24} color="#FF4444" />
            </TouchableOpacity>
          </View>

          <View style={styles.farmerDetailCard}>
            <Image
              source={{ uri: 'https://api.a0.dev/assets/image?text=farmer%20profile%20picture%20professional&aspect=1:1' }}
              style={styles.farmerDetailImage}
            />
            <View style={styles.farmerDetailInfo}>
              <Text style={styles.farmerDetailName}>{selectedProduct?.farmer}</Text>
              <Text style={styles.farmerDetailLocation}>
                <Ionicons name="location-outline" size={14} color="#666" />
                {selectedProduct?.location}
              </Text>
              <View style={styles.farmerRating}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{selectedProduct?.rating}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => setShowChat(true)}
            >
              <Ionicons name="chatbubble-outline" size={20} color="#fff" />
              <Text style={styles.chatButtonText}>Chat</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <Text style={styles.detailDescription}>
              {selectedProduct?.description}
            </Text>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Available Quantity</Text>
            <Text style={styles.quantityText}>{selectedProduct?.available}</Text>
          </View>

          <View style={styles.reviewSection}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <View style={styles.reviewCard}>
              <Image
                source={{ uri: 'https://api.a0.dev/assets/image?text=user%20avatar%20minimal&aspect=1:1' }}
                style={styles.reviewerImage}
              />
              <View style={styles.reviewContent}>
                <Text style={styles.reviewerName}>John Doe</Text>
                <View style={styles.starContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
                <Text style={styles.reviewText}>
                  Excellent quality products! The tomatoes were fresh and tasty.
                  Will definitely buy again.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.addToCartDetailButton}>
            <Text style={styles.actionButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.actionButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  </Modal>
);

const products = [
    {
      id: '1',
      name: 'Organic Tomatoes',
      price: '₹40/kg',
      farmer: 'Ram Kumar',
      rating: 4.5,
      location: 'Karnataka',
      category: 'Vegetables',
      description: 'Fresh, pesticide-free tomatoes grown using organic farming methods.',
      available: '100 kg',
      image: 'https://api.a0.dev/assets/image?text=fresh%20red%20tomatoes%20on%20vine%20organic%20farming&aspect=4:3'
    },
    {
      id: '2',
      name: 'Fresh Milk',
      price: '₹60/L',
      farmer: 'Lakshmi Dairy Farm',
      rating: 4.8,
      location: 'Tamil Nadu',
      category: 'Dairy',
      description: 'Pure cow milk from our own dairy farm. No additives.',
      available: '200 L',
      image: 'https://api.a0.dev/assets/image?text=fresh%20dairy%20milk%20farm%20pure&aspect=4:3'
    },
    {
      id: '3',
      name: 'Organic Millet',
      price: '₹120/kg',
      farmer: 'Green Fields',
      rating: 4.6,
      location: 'Maharashtra',
      category: 'Grains',
      description: 'Traditional millet varieties rich in nutrients.',
      available: '500 kg',
      image: 'https://api.a0.dev/assets/image?text=organic%20millet%20grains%20healthy&aspect=4:3'
    },
    {
      id: '4',
      name: 'Fresh Mangoes',
      price: '₹80/kg',
      farmer: 'Fruit Garden',
      rating: 4.7,
      location: 'Andhra Pradesh',
      category: 'Fruits',
      description: 'Sweet and juicy mangoes from our orchards.',
      available: '300 kg',
      image: 'https://api.a0.dev/assets/image?text=fresh%20mangoes%20organic%20juicy&aspect=4:3'
    },
  ];

  const LoginModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showLogin}
      onRequestClose={() => setShowLogin(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowLogin(false)}
          >
            <AntDesign name="close" size={24} color="#333" />
          </TouchableOpacity>
          
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=farming%20illustration%20minimal%20icon&aspect=1:1' }}
            style={styles.loginLogo}
          />
          
          <Text style={styles.loginTitle}>Welcome to DeFi Farming</Text>
          <Text style={styles.loginSubtitle}>Login as</Text>
          
          <View style={styles.userTypeContainer}>
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'buyer' && styles.selectedUserType,
              ]}
              onPress={() => setUserType('buyer')}
            >
              <FontAwesome5
                name="user"
                size={24}
                color={userType === 'buyer' ? '#fff' : '#2E7D32'}
              />
              <Text
                style={[
                  styles.userTypeText,
                  userType === 'buyer' && styles.selectedUserTypeText,
                ]}
              >
                Buyer
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'seller' && styles.selectedUserType,
              ]}
              onPress={() => setUserType('seller')}
            >
              <FontAwesome5
                name="user-tie"
                size={24}
                color={userType === 'seller' ? '#fff' : '#2E7D32'}
              />
              <Text
                style={[
                  styles.userTypeText,
                  userType === 'seller' && styles.selectedUserTypeText,
                ]}
              >
                Seller
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.loginInput}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            placeholderTextColor="#666"
          />
          
          <TextInput
            style={styles.loginInput}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#666"
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              setIsLoggedIn(true);
              setShowLogin(false);
            }}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const CategoryList = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryList}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryItem,
            selectedCategory === category.name && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory(category.name)}
        >
          <MaterialCommunityIcons
            name={category.icon}
            size={24}
            color={selectedCategory === category.name ? '#fff' : '#2E7D32'}
          />
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category.name && styles.selectedCategoryText,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const ProductCard = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.imageOverlay}
      >
        <View style={styles.categoryTag}>
          <Text style={styles.categoryTagText}>{item.category}</Text>
        </View>
      </LinearGradient>
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{item.name}</Text>
          <TouchableOpacity style={styles.favoriteButton}>
            <AntDesign name="hearto" size={20} color="#2E7D32" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.productPrice}>{item.price}</Text>
        
        <View style={styles.farmerInfo}>
          <FontAwesome5 name="user-farmer" size={14} color="#666" />
          <Text style={styles.farmerName}>{item.farmer}</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.location}>{item.location}</Text>
        </View>
        
        <View style={styles.bottomRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const SellForm = () => (
    <View style={styles.sellContainer}>
      <Text style={styles.sellTitle}>List Your Agricultural Products</Text>
      
      <TouchableOpacity style={styles.imageUploadButton}>
        <MaterialCommunityIcons name="camera-plus" size={32} color="#fff" />
        <Text style={styles.uploadText}>Upload Product Images</Text>
      </TouchableOpacity>

      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter product name"
            placeholderTextColor="#666"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            placeholder="Select category"
            placeholderTextColor="#666"
          />
        </View>
      </View>

      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Price per unit</Text>
          <TextInput
            style={styles.input}
            placeholder="₹ Enter price"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Available Quantity</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter quantity"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
        </View>
      </View>

      <Text style={styles.label}>Product Description</Text>
      <TextInput
        style={[styles.input, styles.descInput]}
        placeholder="Describe your product"
        placeholderTextColor="#666"
        multiline
      />

      <TouchableOpacity style={styles.listButton}>
        <Text style={styles.listButtonText}>List Product</Text>
      </TouchableOpacity>
    </View>
  );

  if (!isLoggedIn) {
    return (
      <View style={styles.welcomeContainer}>
        <Image
          source={{ uri: 'https://api.a0.dev/assets/image?text=farming%20marketplace%20illustration%20minimal&aspect=1:1' }}
          style={styles.welcomeImage}
        />
        <Text style={styles.welcomeTitle}>DeFi Farming</Text>
        <Text style={styles.welcomeSubtitle}>
          Connect directly with farmers and buy fresh produce
        </Text>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => setShowLogin(true)}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
        <LoginModal />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=user%20avatar%20minimal&aspect=1:1' }}
            style={styles.userAvatar}
          />
          <View>
            <Text style={styles.headerTitle}>DeFi Farming</Text>
            <Text style={styles.locationText}>
              <Ionicons name="location-outline" size={12} color="#666" /> Bangalore
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={24} color="#333" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, farmers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Feather name="sliders" size={20} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'buy' && styles.activeTab]}
          onPress={() => setActiveTab('buy')}
        >
          <Text style={[styles.tabText, activeTab === 'buy' && styles.activeTabText]}>
            Buy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sell' && styles.activeTab]}
          onPress={() => setActiveTab('sell')}
        >
          <Text style={[styles.tabText, activeTab === 'sell' && styles.activeTabText]}>
            Sell
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'buy' && <CategoryList />}

      {activeTab === 'buy' ? (
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <SellForm />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeImage: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  getStartedButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  loginLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  userTypeButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2E7D32',
    width: '45%',
  },
  selectedUserType: {
    backgroundColor: '#2E7D32',
  },
  userTypeText: {
    marginTop: 8,
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
  },
  selectedUserTypeText: {
    color: '#fff',
  },
  loginInput: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#2E7D32',
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#666',
  },
  registerLink: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
  },
  cartBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeTab: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  categoryList: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCategory: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  productList: {
    padding: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    justifyContent: 'flex-start',
    padding: 12,
  },
  categoryTag: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  categoryTagText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
  },
  productInfo: {
    padding: 16,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  favoriteButton: {
    padding: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
    marginBottom: 8,
  },
  farmerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  farmerName: {
    marginLeft: 8,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    marginLeft: 8,
    color: '#666',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    color: '#666',
  },
  addToCartButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '600',
  },
  sellContainer: {
    padding: 16,
  },
  sellTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  imageUploadButton: {
    backgroundColor: '#2E7D32',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 16,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  formGroup: {
    flex: 1,
    marginRight: 10,
  },
  formGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  descInput: {
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  listButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  listButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeFiFarmingApp;