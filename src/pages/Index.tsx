import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface Review {
  id: number;
  productId: number;
  author: string;
  role: string;
  rating: number;
  text: string;
  date: string;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const products: Product[] = [
    {
      id: 1,
      name: 'Поршневая группа STK',
      category: 'Двигатель',
      price: 4500,
      rating: 4.8,
      reviews: 47,
      image: '/placeholder.svg',
      inStock: true
    },
    {
      id: 2,
      name: 'Коленвал ВАЗ 21099',
      category: 'Двигатель',
      price: 12800,
      rating: 4.9,
      reviews: 32,
      image: '/placeholder.svg',
      inStock: true
    },
    {
      id: 3,
      name: 'Комплект прокладок',
      category: 'Прокладки',
      price: 890,
      rating: 4.6,
      reviews: 89,
      image: '/placeholder.svg',
      inStock: true
    },
    {
      id: 4,
      name: 'Масляный насос',
      category: 'Система смазки',
      price: 2300,
      rating: 4.7,
      reviews: 56,
      image: '/placeholder.svg',
      inStock: true
    },
    {
      id: 5,
      name: 'Распредвал спортивный',
      category: 'Двигатель',
      price: 8900,
      rating: 4.9,
      reviews: 23,
      image: '/placeholder.svg',
      inStock: false
    },
    {
      id: 6,
      name: 'Помпа охлаждения',
      category: 'Система охлаждения',
      price: 1450,
      rating: 4.5,
      reviews: 71,
      image: '/placeholder.svg',
      inStock: true
    }
  ];

  const reviews: Review[] = [
    {
      id: 1,
      productId: 1,
      author: 'Сергей М.',
      role: 'Механик с 15-летним стажем',
      rating: 5,
      text: 'Отличное качество поршневой группы. Идеально подходит для капремонта. Зазоры в норме, геометрия точная.',
      date: '2024-12-05'
    },
    {
      id: 2,
      productId: 2,
      author: 'Владимир К.',
      role: 'Владелец ВАЗ 21099',
      rating: 5,
      text: 'Коленвал без нареканий. Балансировка заводская отличная, установил без проблем. Рекомендую!',
      date: '2024-11-28'
    },
    {
      id: 3,
      productId: 3,
      author: 'Анатолий П.',
      role: 'Мастер СТО',
      rating: 4,
      text: 'Прокладки качественные, но маслостойкость можно было бы лучше. В целом для своей цены отлично.',
      date: '2024-12-01'
    }
  ];

  const categories = ['Все', 'Двигатель', 'Прокладки', 'Система смазки', 'Система охлаждения'];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = selectedCategory === 'Все'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                <Icon name="Wrench" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ВАЗ 21099</h1>
                <p className="text-xs text-muted-foreground">Запчасти для двигателя</p>
              </div>
            </div>

            <nav className="hidden md:flex gap-6">
              <Button variant="ghost" className="text-foreground">Главная</Button>
              <Button variant="ghost" className="text-foreground">Каталог</Button>
              <Button variant="ghost" className="text-foreground">Доставка</Button>
              <Button variant="ghost" className="text-foreground">Гарантия</Button>
              <Button variant="ghost" className="text-foreground">О нас</Button>
              <Button variant="ghost" className="text-foreground">Контакты</Button>
            </nav>

            <Button
              variant="outline"
              className="relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <Icon name="ShoppingCart" size={20} />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}>
          <div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border p-6 shadow-lg animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Корзина</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                <Icon name="X" size={24} />
              </Button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Icon name="ShoppingCart" size={64} className="mb-4 opacity-50" />
                <p>Корзина пуста</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto mb-6 space-y-4">
                  {cart.map(item => (
                    <Card key={item.id} className="p-4">
                      <div className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                          <p className="text-primary font-bold">{item.price} ₽</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 ml-auto"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Итого:</span>
                    <span className="text-primary">{totalPrice.toLocaleString()} ₽</span>
                  </div>
                  <Button className="w-full" size="lg">
                    Оформить заказ
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 relative overflow-hidden rounded-lg bg-gradient-to-r from-card to-muted p-8 md:p-12 border border-border">
          <div className="relative z-10">
            <Badge className="mb-4" variant="secondary">
              <Icon name="Award" size={14} className="mr-1" />
              Гарантия качества
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Запчасти для двигателя
              <br />
              <span className="text-primary">ВАЗ 21099</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              Оригинальные и сертифицированные детали. Проверено механиками. 
              Быстрая доставка по всей России.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2">
                <Icon name="Wrench" size={20} />
                Перейти в каталог
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Phone" size={20} />
                Связаться с нами
              </Button>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Каталог запчастей</h3>
            <div className="flex gap-2">
              <Input placeholder="Поиск..." className="w-64" />
              <Button variant="outline" size="icon">
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const productReviews = reviews.filter(r => r.productId === product.id);
              return (
                <Card key={product.id} className="overflow-hidden group hover:border-primary transition-all">
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {!product.inStock && (
                      <Badge className="absolute top-3 right-3" variant="secondary">
                        Нет в наличии
                      </Badge>
                    )}
                    {product.inStock && product.reviews > 50 && (
                      <Badge className="absolute top-3 right-3 bg-primary">
                        <Icon name="TrendingUp" size={12} className="mr-1" />
                        Хит продаж
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {product.category}
                    </Badge>
                    <h4 className="font-bold mb-2 text-lg">{product.name}</h4>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                      <Button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className="gap-2"
                      >
                        <Icon name="ShoppingCart" size={16} />
                        В корзину
                      </Button>
                    </div>

                    {productReviews.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="text-xs text-muted-foreground mb-2">Последний отзыв:</div>
                        <div className="bg-muted/50 p-3 rounded text-sm">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <span className="font-semibold">{productReviews[0].author}</span>
                              <span className="text-muted-foreground ml-2 text-xs">
                                {productReviews[0].role}
                              </span>
                            </div>
                            <div className="flex gap-0.5">
                              {[...Array(productReviews[0].rating)].map((_, i) => (
                                <Icon key={i} name="Star" size={10} className="fill-primary text-primary" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {productReviews[0].text}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Отзывы механиков и владельцев</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(review => {
              const product = products.find(p => p.id === review.productId);
              return (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold">{review.author}</h4>
                      <p className="text-xs text-muted-foreground">{review.role}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={14} className="fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <Badge variant="outline" className="mb-3 text-xs">
                    {product?.name}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-3">{review.text}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={12} />
                    {new Date(review.date).toLocaleDateString('ru-RU')}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 border-primary/50">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Icon name="Shield" size={24} className="text-primary" />
            </div>
            <h4 className="font-bold mb-2">Гарантия качества</h4>
            <p className="text-sm text-muted-foreground">
              Официальная гарантия на все запчасти. Возврат и обмен в течение 30 дней.
            </p>
          </Card>
          <Card className="p-6 border-primary/50">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Icon name="Truck" size={24} className="text-primary" />
            </div>
            <h4 className="font-bold mb-2">Быстрая доставка</h4>
            <p className="text-sm text-muted-foreground">
              Доставка по России от 1 дня. Бесплатная доставка при заказе от 10 000 ₽.
            </p>
          </Card>
          <Card className="p-6 border-primary/50">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Icon name="Users" size={24} className="text-primary" />
            </div>
            <h4 className="font-bold mb-2">Поддержка экспертов</h4>
            <p className="text-sm text-muted-foreground">
              Консультации опытных механиков. Поможем выбрать нужную деталь.
            </p>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <Icon name="Wrench" size={18} className="text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">ВАЗ 21099</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Надежные запчасти для вашего автомобиля. Работаем с 2010 года.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Каталог</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Двигатель</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Трансмиссия</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Подвеска</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Электрика</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Информация</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гарантия</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Контакты</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  info@vaz21099.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={14} />
                  Москва, ул. Автозаводская, 1
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-center text-sm text-muted-foreground">
            © 2024 ВАЗ 21099 Запчасти. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;