import { firestore } from 'firebase-admin';

export const getAllData = async (
  db: firestore.Firestore,
  collection: string,
  limit: number | undefined = 5
) => {
  let dataArray: Array<any> = [];

  try {
    const dataList = await db.collection(collection).limit(limit).get();
    dataList.forEach((data) => {
      dataArray.push(data.data());
    });
  } catch (error) {
    console.log(error);
  }

  return dataArray;
};

export const getDataWithSingleFilter = async (
  db: firestore.Firestore,
  collection: string,
  limit: number | undefined = 5,
  filter: Object
) => {
  let dataArray: Array<any> = [];

  try {
    const dataList = await db
      .collection(collection)
      .where(Object.keys(filter)[0], '==', Object.values(filter)[0])
      .limit(limit)
      .get();
    dataList.forEach((data) => {
      dataArray.push(data.data());
    });
  } catch (error) {
    console.log(error);
  }

  return dataArray;
};

// Get single product.
export const getProduct = async (db: firestore.Firestore, collection: string, id: string) => {
  let product;
  try {
    product = await db.collection(collection).doc(id).get();
    if (!product.exists) {
      product = undefined;
    } else {
      product = product.data();
    }
  } catch (error) {
    console.log(error);
  }

  return product;
};

// Get data from Firestore with pagination and sort
export const getDataWithPagination = async (
  db: firestore.Firestore,
  collection: string,
  page: number | undefined = 1,
  limit: number | undefined = 5,
  sort: string | firestore.FieldPath | string[] = 'salePrice:asc',
  filters: any
) => {
  let productData: Array<any> = [];
  let totalCount;
  let orderByOptions: firestore.OrderByDirection = 'asc';
  let orderByPath: string | firestore.FieldPath = 'salePrice';
  let firstDoc: firestore.QueryDocumentSnapshot<firestore.DocumentData>;

  if (typeof sort === 'string') {
    const sortArray = sort.split(':');
    orderByPath = sortArray[0];
    orderByOptions = sortArray[1] as firestore.OrderByDirection;
  }
  // Check if the input sort query not existing
  if (!orderByPath && !orderByOptions) return { productData: [], totalCount: 0 };

  try {
    // Get the last document per page
    const startAt = !page || page <= 1 ? 0 : (page - 1) * (limit || 5);

    // Filters
    const newFilters = Object.keys(filters).filter((x) => filters[x] === 'true');
    if (newFilters.length > 0) {
      const queriesAll = newFilters.map(async (filter) => {
        return await db
          .collection(collection)
          .where(filter, '==', filters[filter] === 'true')
          .orderBy(orderByPath, orderByOptions)
          .get();
      });

      totalCount = await Promise.all(queriesAll).then((querySnapshots) => {
        return querySnapshots
          .map((querySnapshot) => {
            firstDoc = querySnapshot.docs[startAt];
            return querySnapshot.docs;
          })
          .reduce((acc, docs) => [...acc, ...docs]).length;
      });

      const queries = newFilters.map(async (filter) => {
        return await db
          .collection(collection)
          .where(filter, '==', filters[filter] === 'true')
          .orderBy(orderByPath, orderByOptions)
          .startAt(firstDoc)
          .limit(limit)
          .get();
      });

      productData = await Promise.all(queries)
        .then((querySnapshots) =>
          querySnapshots
            .map((querySnapshot) => querySnapshot.docs)
            .reduce((acc, docs) => [...acc, ...docs])
        )
        .then((documentSnapshots) => {
          const newArr: any[] = [];
          documentSnapshots.forEach((documentSnapshot) => {
            newArr.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
          });
          return newArr;
        });
    } else {
      const snapshot = await db.collection(collection).orderBy(orderByPath, orderByOptions).get();
      firstDoc = snapshot.docs[startAt];
      totalCount = snapshot.docs.length;

      const querySnapshot = await db
        .collection(collection)
        .orderBy(orderByPath, orderByOptions)
        .startAt(firstDoc)
        .limit(limit)
        .get();

      querySnapshot.forEach((documentSnapshot) => {
        productData.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
      });
    }
  } catch (error) {
    console.log(error);
  }

  return { productData: await productData, totalCount: await totalCount };
};
