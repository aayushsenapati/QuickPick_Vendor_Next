import { NextResponse } from 'next/server';
import { db } from '@/app/firebase/config';
import { collection, getDocs, where, query, getDoc, limit, arrayUnion, updateDoc, arrayRemove, runTransaction, doc} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';



export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const restaurantName = searchParams.get('restaurantName');
  const email = searchParams.get('email');
  console.log(email)
  console.log(restaurantName)

  try {
    // 1. Retrieve vendor document by email
    const vendorDocRef = query(collection(db, "vendor"), where("email", "==", email), limit(1));
    const vendorDocSnapshot = await getDocs(vendorDocRef);

    if (!vendorDocSnapshot.empty) {
      const vendorData = vendorDocSnapshot.docs[0].data();

      const restaurantRefs = await Promise.all(vendorData.restaurants.map(async (ref) => {
        const resref = await getDoc(ref);
        const restaurantNameFromRef = resref.data().name;
        return { ref, restaurantNameFromRef };
      }));

      const matchingRef = restaurantRefs.find((refData) => refData.restaurantNameFromRef === restaurantName);
      const restaurantRef = matchingRef?.ref;

      if (restaurantRef) {
        // 3. Fetch restaurant data
        const restaurantDocSnapshot = await getDoc(restaurantRef);
        const restaurantData = restaurantDocSnapshot.data();
        console.log(restaurantData)
        let itemsWithPricing = []
        // 4. Extract menu with pricing
        if (restaurantData.menu) {
          itemsWithPricing = restaurantData.menu.map((item) => ({
            name: item.name,
            price: item.price,
            item_id: item.item_id
          }));
        }
        console.log(itemsWithPricing)
        return NextResponse.json({ itemsWithPricing }, { status: 200 });
      } else {
        return NextResponse.json({ error: 'restaurant not found' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: 'vendor not found' }, { status: 404 });
    }
  } catch (error) {
    console.error("Firestore error:", error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}



export async function PATCH(request) {
  const body = await request.json()
  const { ItemName, ItemPrice, restaurantName, isEdit, selectedMenuItem } = body
  console.log(ItemName, ItemPrice, restaurantName, isEdit, selectedMenuItem)
  try {
    const r = query(collection(db, "restaurants"), where("name", "==", restaurantName), limit(1))
    const RestaurantSnapshot = await getDocs(r);
    const RestaurantRef = RestaurantSnapshot.docs[0].ref;
    const menu = RestaurantSnapshot.docs[0].data().menu;
    if (!isEdit) {

      // Check for existing item name
      if (menu.some((item) => item.name == ItemName)) {
        return NextResponse.json({ error: 'Item already exists in the menu' }, { status: 409 }); // Conflict
      }

      const newItem = { 
        name: ItemName, 
        price: ItemPrice, 
        item_id:uuidv4() // Generate a unique Firebase ID for the item
      };

      await updateDoc(RestaurantRef, { menu: arrayUnion(newItem) });
    }
    else {
      for (const menuItem of menu) {
        if (menuItem.name === selectedMenuItem.name) {
          const index = menu.indexOf(menuItem); // Get the index of the matching item

          await runTransaction(db, async (transaction) => {
            const doc = await transaction.get(RestaurantRef);
            if (doc.exists) {
              menu[index] = { 
                name: ItemName, 
                price: ItemPrice, 
                item_id: menuItem.item_id // Keep the same item_id
              }; 
              transaction.update(RestaurantRef, { menu }); // Commit the updated array
            }
          });

          break;
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 201 }); // Indicate successful creation

  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add to menu' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const body = await request.json()
  const { restaurantName, selectedMenuItem } = body
  console.log(restaurantName, selectedMenuItem)

  try {
    const r = query(collection(db, "restaurants"), where("name", "==", restaurantName), limit(1))
    const RestaurantSnapshot = await getDocs(r);
    const RestaurantRef = RestaurantSnapshot.docs[0].ref;
    // const menu = RestaurantSnapshot.docs[0].data().menu;

    await updateDoc(RestaurantRef, {
      menu: arrayRemove(selectedMenuItem)
    });


    // for (const menuItem of menu) {
    //   if (menuItem.name === selectedMenuItem.name) {
    //     // const index = menu.indexOf(menuItem);
    //     await updateDoc(RestaurantRef, {
    //       menu: arrayRemove(menuItem)
    //     });
    //     break; // Exit the loop after removing the first match
    //   }
    // }
    return NextResponse.json({ success: true }, { status: 200 }); // No Content


  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }

}
