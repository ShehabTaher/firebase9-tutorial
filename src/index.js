import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    getDoc,
    updateDoc
}
    from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword
}
    from 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyC2-GpZ-nyPR9SERnfmHTTT3ocPMhMMaZs",
    authDomain: "fir-tutorial9.firebaseapp.com",
    projectId: "fir-tutorial9",
    storageBucket: "fir-tutorial9.appspot.com",
    messagingSenderId: "614728007826",
    appId: "1:614728007826:web:a14944f174cb2ca261a64b"
};

/* ==== Versions before firebase 9 ====
* firebase.initializeApp(firebaseConfig)
* const db = firebase.firestore()
* db.collection('books)
*/

// Init firebase app
initializeApp(firebaseConfig)


// Init services
const db = getFirestore()
const auth = getAuth()

// Collection ref
const colRef = collection(db, 'books')


// Get Collection data
/* 
getDocs(colRef).then((snapshot) => {
    // console.log(snapshot.docs);
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
}).catch(err => {
    console.log(err.message)
})
*/

// Real Time Collection data
// onSnapshot(colRef, (snapshot) => {
//     let books = []
//     snapshot.docs.forEach((doc) => {
//         books.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(books);

// })



// Queries && Where && Order By 
// const q = query(colRef, where("author", "==", "James Clear"), orderBy('createdAt'))

const q = query(colRef, orderBy('createdAt'))
onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);

})


// adding Documents 
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        // Ceate At in Time
        createdAt: serverTimestamp()
    })
        .then(() => {
            addBookForm.reset()
        })
})

// deleting Documents 
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })
})


// Get single Document

// const docRef = doc(db, 'books', 'P99dEfXsic0oCRK9DDuF')

// getDoc(docRef)
//     .then((doc) => {
//         console.log(`${doc.data().title} by ${doc.data().author}`)
// })



// Real Time single Document

const docRef = doc(db, 'books', 'P99dEfXsic0oCRK9DDuF')
onSnapshot(docRef, (doc) => {
    console.log(`${doc.data().title} by ${doc.data().author}`)
})




// Updating Documents 
const updateBookForm = document.querySelector('.update')
updateBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateBookForm.id.value)

    updateDoc(docRef, {
        title: 'updated title'
    })
        .then(() => {
            updateBookForm.reset()
        })
})

// Signup User
const signupForm = document.querySelector('.signup')
signupForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log("user created:", cred.user);
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message);
        })
})

// Login USer
const loginForm = document.querySelector('.login')
loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log("user logged in:", cred.user);
        })
        .catch((err) => {
            console.log(err.message);
        })
})

// Logout User
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener("click ", () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out");
        })
        .catch((err) => {
            console.log(err.message);
        })

})