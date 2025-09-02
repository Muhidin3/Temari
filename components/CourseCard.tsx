import { Clock, Heart, Play, ShoppingCart, Star, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function CourseCard({course,viewMode,language}:any){
return (
    <Card
      key={course.id}
      className={
        `group hover:shadow-lg transition-all duration-300 dark:bg-slate-900
        ${viewMode === "list" ? "flex flex-row" : ""}`
      }
    >
      <div className={`relative ${viewMode === "list" ? "w-64 flex-shrink-0" : ""}`}>
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          className={`object-cover ${
            viewMode === "list" ? "w-full h-full rounded-l-lg" : "w-full h-48 rounded-t-lg"
          }`}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {course.isNew && (
            <Badge className="bg-green-500 text-white">{language === "am" ? "አዲስ" : "New"}</Badge>
          )}
          {course.isBestseller && (
            <Badge className="bg-orange-500 text-white">
              {language === "am" ? "ምርጥ ሽያጭ" : "Bestseller"}
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <CardHeader className={viewMode === "list" ? "pb-2" : "pb-3"}>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {course.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
          </div>
          <CardTitle
            className={`leading-tight line-clamp-2 dark:text-green-50 ${viewMode === "list" ? "text-lg" : "text-lg"}`}
          >
            {language === "am" ? course.titleAm : course.title}
          </CardTitle>
          <CardDescription className="text-sm">{course.instructor}</CardDescription>
          {viewMode === "list" && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
              {language === "am" ? course.descriptionAm : course.description}
            </p>
          )}
        </CardHeader>

        <CardContent className={viewMode === "list" ? "pt-0 pb-2" : "pt-0"}>
          <div
            className={`flex items-center gap-4 text-sm text-muted-foreground mb-3 ${
              viewMode === "list" ? "flex-wrap" : ""
            }`}
          >
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            {viewMode === "list" && (
              <div className="text-xs">
                {course.lectures} {language === "am" ? "ትምህርቶች" : "lectures"}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-abuki-primary">{course.price} ETB</span>
              <span className="text-sm text-muted-foreground line-through">{course.originalPrice} ETB</span>
            </div>
            {viewMode === "list" && (
              <div className="text-xs text-muted-foreground">
                {language === "am" ? "ተዘምኗል" : "Updated"} {course.lastUpdated}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className={`gap-2 ${viewMode === "list" ? "pt-0" : ""}`}>
          <Button className="flex-1 bg-abuki-primary hover:bg-abuki-accent">
            <ShoppingCart className="mr-2 h-4 w-4" />
            {language === "am" ? "ወደ ጋሪ ጨምር" : "Add to Cart"}
          </Button>
          {viewMode === "list" && (
            <Button variant="outline" className="flex-1 bg-transparent">
              {language === "am" ? "ዝርዝር ይመልከቱ" : "View Details"}
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
)
}