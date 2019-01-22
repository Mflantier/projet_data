<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController{

    /**
     * @Route("/", name="home")
     */
    public function home(){
        return $this->render('views/home.html.twig', ['title' => 'Home']);
    }
    
    /**
     * @Route("/flags", name="flags")
     */
    public function flags(){
        return $this->render('views/flags.html.twig', ['title' => 'Drapeaux']);
    }
    
    /**
     * @Route("/list", name="listePays")
     */
    public function listePays(){
        return $this->render('views/listPays.html.twig', ['title' => 'Pays']);
    }

     /**
    * @Route("/capital", name="listeCapitale")
    */
    public function listeCapitale(){
        return $this->render('views/capitals.html.twig', ['title' => 'Capitales']);
    }

    /**
    * @Route("/continent/{id}", name="listeContinent")
    */
    public function listeContinent(){
        return $this->render('views/continent.html.twig', ['title' => 'Continent']);
    }
}