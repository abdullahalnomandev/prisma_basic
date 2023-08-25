import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDB = async (data: Post): Promise<Post> => {
  return prisma.post.create({
    data,
    include: {
      author: true,
      category: true
    }
  });
};
const getAllPost = async (options: any) => {
  console.log('getPost');
  
  const { sortBy, sortOrder, searchTerm, page, limit } = options;

  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
  const take = parseInt(limit) || 10;

  return await prisma.$transaction(async (tx) => {
    const results = await tx.post.findMany({
      skip,
      take,
      include: {
        author: true,
        category: true
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder
            }
          : { createdAt: "desc" },
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive"
            }
          },
          {
            author: {
              name: {
                contains: searchTerm,
                mode: "insensitive"
              }
            }
          }
        ]
      }
    });
    const total = await tx.post.count();
    return { data: results, total };
  });
};

const updatePost = async (id:number,payload:Partial<Post>):Promise<Post> => {

  const result = await prisma.post.update({
    where:{
      id
    },
    data: payload,
    include:{
      author:true,
      category:true
    }
  })

  return result;
}

const deletePost = async (id:number):Promise<Post> => {
  const result = await prisma.post.delete({
    where:{
      id
    }
  })

  return result;
}

const learnAggregateAndGrouping = async () => {
  // const result = await prisma.post.aggregate({
  //   _avg:{
  //     authorId:true,
  //     categoryId:true
  //   },
  //   _count:{
  //     authorId:true
  //   }
  // })

  const groupUsers = await prisma.post.groupBy({
    by: ["title","authorId"],
    _count:{
      title:true
    }
  });
  return groupUsers;
}

export const PostService = {
  insertIntoDB,
  getAllPost,
  updatePost,
  deletePost,
  learnAggregateAndGrouping
};
