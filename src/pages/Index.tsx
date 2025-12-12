import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface Engine {
  id: string;
  name: string;
  type: 'carburetor' | 'injection';
  year: string;
  volume: string;
  power: string;
  torque: string;
  fuel: string;
  features: string[];
  specs: {
    cylinders: string;
    valves: string;
    compression: string;
    cooling: string;
  };
}

const Index = () => {
  const [selectedEngine, setSelectedEngine] = useState<string>('21213');

  const engines: Engine[] = [
    {
      id: '21213',
      name: '21213',
      type: 'carburetor',
      year: '1994-2006',
      volume: '1.7 л',
      power: '79.5 л.с.',
      torque: '127 Н·м',
      fuel: 'АИ-92',
      features: [
        'Классический карбюраторный двигатель',
        'Высокая надёжность',
        'Простота обслуживания',
        'Отличная ремонтопригодность'
      ],
      specs: {
        cylinders: '4 цилиндра, рядный',
        valves: '8 клапанов (2 на цилиндр)',
        compression: '9.3:1',
        cooling: 'Жидкостное'
      }
    },
    {
      id: '21214',
      name: '21214',
      type: 'injection',
      year: '2006-н.в.',
      volume: '1.7 л',
      power: '83 л.с.',
      torque: '129 Н·м',
      fuel: 'АИ-95',
      features: [
        'Инжекторная система впрыска',
        'Экологичность Евро-3/4',
        'Лучшая динамика',
        'Стабильный холодный пуск'
      ],
      specs: {
        cylinders: '4 цилиндра, рядный',
        valves: '8 клапанов (2 на цилиндр)',
        compression: '9.4:1',
        cooling: 'Жидкостное'
      }
    },
    {
      id: '21215',
      name: '21215 (Euro-5)',
      type: 'injection',
      year: '2014-н.в.',
      volume: '1.7 л',
      power: '83 л.с.',
      torque: '129 Н·м',
      fuel: 'АИ-95',
      features: [
        'Современная система управления',
        'Экологичность Евро-5',
        'Каталитический нейтрализатор',
        'Датчик кислорода'
      ],
      specs: {
        cylinders: '4 цилиндра, рядный',
        valves: '8 клапанов (2 на цилиндр)',
        compression: '9.4:1',
        cooling: 'Жидкостное'
      }
    }
  ];

  const maintenanceSchedule = [
    { km: '2000', task: 'Первое ТО', items: ['Замена масла', 'Проверка регулировок'] },
    { km: '10000', task: 'Регламентное ТО', items: ['Масло двигателя', 'Масляный фильтр', 'Воздушный фильтр', 'Свечи зажигания'] },
    { km: '20000', task: 'Большое ТО', items: ['Масло двигателя', 'Фильтры', 'Ремень ГРМ (проверка)', 'Клапаны (регулировка)'] },
    { km: '60000', task: 'Капитальное ТО', items: ['Ремень ГРМ (замена)', 'Помпа', 'Антифриз', 'Все фильтры'] }
  ];

  const commonIssues = [
    {
      problem: 'Перегрев двигателя',
      causes: ['Низкий уровень ОЖ', 'Неисправен термостат', 'Забит радиатор', 'Воздух в системе'],
      solution: 'Проверить уровень антифриза, состояние термостата и радиатора. Удалить воздушные пробки.'
    },
    {
      problem: 'Повышенный расход масла',
      causes: ['Износ поршневых колец', 'Износ маслосъёмных колпачков', 'Течь прокладок'],
      solution: 'Диагностика компрессии. Замена колпачков или капремонт. Устранение течей.'
    },
    {
      problem: 'Нестабильный холостой ход',
      causes: ['Подсос воздуха', 'Засорён карбюратор/форсунки', 'Неисправен РХХ (инжектор)'],
      solution: 'Проверить герметичность впускного тракта. Чистка карбюратора или форсунок.'
    },
    {
      problem: 'Детонация при разгоне',
      causes: ['Низкое октановое число топлива', 'Раннее зажигание', 'Нагар в камере сгорания'],
      solution: 'Использовать качественное топливо. Отрегулировать УОЗ. Раскоксовка двигателя.'
    }
  ];

  const engineParts = [
    { name: 'Блок цилиндров', description: 'Чугунный, 4-цилиндровый' },
    { name: 'Головка блока', description: 'Алюминиевая, 8-клапанная' },
    { name: 'Поршневая группа', description: 'Диаметр 82мм, ход 80мм' },
    { name: 'Коленвал', description: '5 опор, противовесы' },
    { name: 'Распредвал', description: 'Верхнее расположение, цепной привод' },
    { name: 'Система смазки', description: 'Комбинированная под давлением' },
    { name: 'Система охлаждения', description: 'Жидкостная, принудительная' },
    { name: 'Система питания', description: 'Карбюратор/Инжектор' }
  ];

  const currentEngine = engines.find(e => e.id === selectedEngine) || engines[0];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Cog" size={28} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Двигатели ВАЗ 2121</h1>
                <p className="text-xs text-muted-foreground">Техническая энциклопедия LADA Niva</p>
              </div>
            </div>

            <nav className="hidden md:flex gap-6">
              <Button variant="ghost" className="text-foreground">
                <Icon name="Book" size={18} className="mr-2" />
                Характеристики
              </Button>
              <Button variant="ghost" className="text-foreground">
                <Icon name="Wrench" size={18} className="mr-2" />
                Обслуживание
              </Button>
              <Button variant="ghost" className="text-foreground">
                <Icon name="AlertCircle" size={18} className="mr-2" />
                Неисправности
              </Button>
            </nav>

            <Button variant="outline" size="sm">
              <Icon name="FileText" size={16} className="mr-2" />
              Скачать руководство
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-16 relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-muted p-12 border border-border">
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/50">
                <Icon name="Zap" size={14} className="mr-1" />
                Легендарная надёжность
              </Badge>
              <h2 className="text-5xl font-bold mb-4 leading-tight">
                Технический гид
                <br />
                по двигателям
                <br />
                <span className="text-primary">ВАЗ 2121 Нива</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Полная информация о конструкции, обслуживании и ремонте двигателей классической Нивы. 
                Технические характеристики, регламент ТО, типичные неисправности.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="gap-2">
                  <Icon name="BookOpen" size={20} />
                  Начать изучение
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Icon name="Youtube" size={20} />
                  Видеоуроки
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-xl bg-muted/50 border-2 border-primary/30 flex items-center justify-center relative overflow-hidden">
                <Icon name="Cog" size={200} className="text-primary/20 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur border border-border rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Мощность</div>
                <div className="text-2xl font-bold text-primary">79-83 л.с.</div>
              </div>
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur border border-border rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Объём</div>
                <div className="text-2xl font-bold text-primary">1.7 л</div>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -left-20 -top-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </section>

        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-3">Модификации двигателей</h3>
            <p className="text-muted-foreground">Выберите двигатель для просмотра характеристик</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {engines.map(engine => (
              <Card
                key={engine.id}
                className={`p-6 cursor-pointer transition-all hover:scale-105 ${
                  selectedEngine === engine.id
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/50'
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedEngine(engine.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant={engine.type === 'injection' ? 'default' : 'secondary'} className="mb-2">
                      {engine.type === 'injection' ? 'Инжектор' : 'Карбюратор'}
                    </Badge>
                    <h4 className="text-2xl font-bold">{engine.name}</h4>
                    <p className="text-sm text-muted-foreground">{engine.year}</p>
                  </div>
                  <Icon
                    name={engine.type === 'injection' ? 'Zap' : 'Gauge'}
                    size={32}
                    className="text-primary"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Объём:</span>
                    <span className="font-semibold">{engine.volume}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Мощность:</span>
                    <span className="font-semibold text-primary">{engine.power}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Крутящий момент:</span>
                    <span className="font-semibold">{engine.torque}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-8 border-primary/50">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="specs" className="gap-2">
                  <Icon name="FileText" size={16} />
                  Характеристики
                </TabsTrigger>
                <TabsTrigger value="features" className="gap-2">
                  <Icon name="Star" size={16} />
                  Особенности
                </TabsTrigger>
                <TabsTrigger value="parts" className="gap-2">
                  <Icon name="Box" size={16} />
                  Устройство
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="space-y-4">
                <h4 className="text-xl font-bold mb-4">Технические характеристики {currentEngine.name}</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Конфигурация</div>
                      <div className="font-semibold">{currentEngine.specs.cylinders}</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Клапанный механизм</div>
                      <div className="font-semibold">{currentEngine.specs.valves}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Степень сжатия</div>
                      <div className="font-semibold">{currentEngine.specs.compression}</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Система охлаждения</div>
                      <div className="font-semibold">{currentEngine.specs.cooling}</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-primary/10 border border-primary/50 p-4 rounded-lg text-center">
                    <Icon name="Gauge" size={24} className="mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-primary">{currentEngine.power}</div>
                    <div className="text-xs text-muted-foreground">Максимальная мощность</div>
                  </div>
                  <div className="bg-primary/10 border border-primary/50 p-4 rounded-lg text-center">
                    <Icon name="Zap" size={24} className="mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-primary">{currentEngine.torque}</div>
                    <div className="text-xs text-muted-foreground">Крутящий момент</div>
                  </div>
                  <div className="bg-primary/10 border border-primary/50 p-4 rounded-lg text-center">
                    <Icon name="Fuel" size={24} className="mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-primary">{currentEngine.fuel}</div>
                    <div className="text-xs text-muted-foreground">Рекомендуемое топливо</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <h4 className="text-xl font-bold mb-4">Особенности двигателя {currentEngine.name}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentEngine.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={16} className="text-primary" />
                      </div>
                      <div className="text-sm">{feature}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="parts" className="space-y-4">
                <h4 className="text-xl font-bold mb-4">Основные узлы двигателя</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {engineParts.map((part, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <Icon name="Box" size={20} className="text-primary mt-1" />
                        <div>
                          <div className="font-semibold mb-1">{part.name}</div>
                          <div className="text-sm text-muted-foreground">{part.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </section>

        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-3">Регламент технического обслуживания</h3>
            <p className="text-muted-foreground">Плановые работы для поддержания ресурса двигателя</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {maintenanceSchedule.map((schedule, index) => (
              <Card key={index} className="p-6 hover:border-primary/50 transition-all hover:scale-105">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Icon name="Wrench" size={28} className="text-primary" />
                  </div>
                  <Badge variant="outline" className="mb-2">{schedule.km} км</Badge>
                  <h4 className="font-bold text-lg">{schedule.task}</h4>
                </div>
                <Separator className="my-4" />
                <ul className="space-y-2">
                  {schedule.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={14} className="text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-3">Типичные неисправности и решения</h3>
            <p className="text-muted-foreground">Часто встречающиеся проблемы и способы их устранения</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {commonIssues.map((issue, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="AlertTriangle" size={20} className="text-destructive" />
                    </div>
                    <span className="font-bold">{issue.problem}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="ml-13 space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Search" size={16} className="text-primary" />
                        Возможные причины:
                      </h5>
                      <ul className="space-y-1 ml-6">
                        {issue.causes.map((cause, i) => (
                          <li key={i} className="text-sm text-muted-foreground list-disc">
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="CheckCircle" size={16} className="text-primary" />
                        Решение:
                      </h5>
                      <p className="text-sm text-muted-foreground ml-6">{issue.solution}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 border-primary/50 hover:scale-105 transition-transform">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
              <Icon name="BookOpen" size={28} className="text-primary" />
            </div>
            <h4 className="font-bold text-lg mb-2">База знаний</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Подробные статьи и руководства по обслуживанию и ремонту двигателей ВАЗ 2121.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Перейти к статьям
            </Button>
          </Card>

          <Card className="p-6 border-primary/50 hover:scale-105 transition-transform">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
              <Icon name="Users" size={28} className="text-primary" />
            </div>
            <h4 className="font-bold text-lg mb-2">Форум владельцев</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Общайтесь с опытными механиками и владельцами Нивы, делитесь опытом.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Присоединиться
            </Button>
          </Card>

          <Card className="p-6 border-primary/50 hover:scale-105 transition-transform">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
              <Icon name="Download" size={28} className="text-primary" />
            </div>
            <h4 className="font-bold text-lg mb-2">Документация</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Скачайте полное руководство по эксплуатации и каталог запчастей в PDF.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Скачать PDF
            </Button>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Cog" size={22} className="text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">ВАЗ 2121</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Техническая энциклопедия для владельцев и механиков LADA Niva. 
                Всё о двигателях легендарного внедорожника.
              </p>
            </div>

            <div>
              <h5 className="font-bold mb-4">Разделы</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Характеристики</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Модификации</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Обслуживание</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Неисправности</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-4">Ресурсы</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">База знаний</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Видеоуроки</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Форум</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Документация</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-4">Контакты</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  info@vaz2121.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  +7 (800) 555-21-21
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={14} />
                  Россия
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Двигатели ВАЗ 2121. Техническая информация.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Youtube" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Share2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
