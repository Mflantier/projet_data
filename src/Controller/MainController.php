<?php

namespace App\Controller;

use Symfony\Component\Finder\Finder;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class MainController extends AbstractController{

    /**
     * @Route("/", name="accueil")
     */
    public function home(){
        return $this->render('views/home.html.twig', ['title' => 'Accueil']);
    }
    
    /**
     * @Route("/drapeaux", name="drapeaux")
     */
    public function flags(){
        return $this->render('views/flags.html.twig', ['title' => 'Drapeaux']);
    }
    
    /**
     * @Route("/pays", name="pays")
     */
    public function listePays(){
        return $this->render('views/listPays.html.twig', ['title' => 'Pays']);
    }

     /**
    * @Route("/capitales", name="capitales")
    */
    public function listeCapitale(){
        return $this->render('views/capitals.html.twig', ['title' => 'Capitales']);
    }

    /**
    * @Route("/continents/{id}", name="continents")
    */
    public function listeContinent(){
        return $this->render('views/continent.html.twig', ['title' => 'Continents']);
    }

    /**
    * @Route("/langues", name="langues")
    */
    public function listeLangues(){
      $finder = new finder();
        
      $finder->files()->in(__DIR__.'/../../assets/js/')->name('langues.json');
      foreach($finder as $file) {
          $contents = $file->getContents();
      }
     $response = JsonResponse::fromJsonString($contents);
     return $response;
    }

 /**
    * @Route("/devises", name="devises")
    */
    public function listeDevises(){
        $finder = new finder();
          
        $finder->files()->in(__DIR__.'/../../assets/js/')->name('devises.json');
        foreach($finder as $file) {
            $contents = $file->getContents();
        }
       $response = JsonResponse::fromJsonString($contents);
       return $response;
      }
  
}