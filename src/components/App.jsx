import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup  from "./ImagePopup/ImagePopup.jsx";
import { useEffect, useState } from "react";
import CurrentUserContext from "../context/CurrentUserContext.js"
import api from "../utils/api.js"
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

function App() {

  //стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopup, setImagePopup] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isSend, setIsSend] = useState(false)

//стейт контекста 
  const [currentUser, setCurrentUser] = useState({})

//стейты карточки
  const [cards, setCards] = useState([])
  const [deleteCardId, setDeleteCardId] = useState('')

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setImagePopup(false)
    setIsDeletePopupOpen(false)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleDeleteClick(cardId) {
    setDeleteCardId(cardId)
  setIsDeletePopupOpen(true)  
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setImagePopup(true)
  }


  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, dataCard]) =>{
      setCurrentUser(dataUser)
    setCards(dataCard)
    }).catch(err => console.log(`Что-то пошло не так: ${err}`));
       },[])


       function handleDeleteCard(evt) {
        evt.preventDefault()
        setIsSend(true)
        api.deleteCard(deleteCardId)
        .then(res => {
          setCards(cards.filter(card => {
            return card._id !== deleteCardId
          }))
          closeAllPopups()
        }).catch(err => console.log(`Ошибка удаления карточки ${err}`))
        .finally(() => setIsSend(false));
       }

// редактирование профиля
       function handleUpdateUser(dataUser, reset) {
        setIsSend(true)
        api.editUserInfo(dataUser)
        .then(res => {
          setCurrentUser(res)
          closeAllPopups()
          reset()
        }).catch(err => console.log(`Ошибка редактирования профиля ${err}`))
        .finally(() => setIsSend(false));
       }

// редактирование аватарки
       function handleUpdateAvatar(dataUser, reset) {
        setIsSend(true)
        api.editUserAvatar(dataUser.avatar)
        .then(res => {
          setCurrentUser(res)
          closeAllPopups()
          reset()
        }).catch(err => console.log(`Ошибка редактирования аватара ${err}`))
        .finally(() => setIsSend(false));
       }


       function handleAddPlaceSubmit(dataCard, reset) {
        setIsSend(true)
        api.addCard(dataCard)
        .then((res) => {
          setCards([res, ...cards])
          closeAllPopups()
          reset()
        }).catch(err => console.log(`Ошибка добавлении карточки ${err}`))
        .finally(() => setIsSend(false));
       }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
  
<Header/>

<Main
onEditProfile = {handleEditProfileClick}
onAddPlace = {handleAddPlaceClick}
onEditAvatar = {handleEditAvatarClick}
onCardClick = {handleCardClick}
onDelete = {handleDeleteClick}
cards={cards}
/>
  
  <Footer/>

  <EditProfilePopup 
   onUpdateUser = {handleUpdateUser}
   isOpen = {isEditProfilePopupOpen}
   isSend = {isSend}
   onClose = {closeAllPopups}
   />

{ <AddPlacePopup 
onAddPlace = {handleAddPlaceSubmit}
isOpen = {isAddPlacePopupOpen}
isSend = {isSend}
onClose = {closeAllPopups}
/> }

<EditAvatarPopup 
onUpdateAvatar = {handleUpdateAvatar}
isOpen = {isEditAvatarPopupOpen}
onClose = {closeAllPopups}
isSend = {isSend}


/>

<PopupWithForm 
  name='delete'
  title='Вы уверены?'
  titleButton='Да' 
  isOpen={isDeletePopupOpen}
  onClose = {closeAllPopups}
  onSubmit = {handleDeleteCard}
  isSend = {isSend}
  />


<ImagePopup card={selectedCard} isOpen={isImagePopup} onClose = {closeAllPopups} />
</div>
</CurrentUserContext.Provider>

  );
}

export default App;
